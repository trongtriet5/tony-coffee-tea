import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MaterialService } from '../material/material.service';
import { CreateOrderDto } from './dto/order.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly materialService: MaterialService,
  ) {}

  async create(dto: CreateOrderDto) {
    const orderType = dto.order_type || 'TAKEAWAY';
    const source = dto.source || 'POS';

    let tableId: string | null = null;
    if (orderType === 'DINE_IN') {
      if (!dto.table_id)
        throw new BadRequestException(
          'Table ID is required for dine-in orders',
        );
      const table = await this.prisma.table.findUnique({
        where: { id: dto.table_id },
      });
      if (!table || table.status !== 'AVAILABLE')
        throw new BadRequestException(`Table not available`);
      tableId = dto.table_id;
    }

    const productIds = dto.items.map((i) => i.product_id);
    const variantIds = dto.items
      .filter((i) => i.variant_id)
      .map((i) => i.variant_id as string);
    const allToppingIds = dto.items.flatMap((i) => i.topping_ids || []);

    const [products, variants, toppings] = await Promise.all([
      this.prisma.product.findMany({
        where: { id: { in: productIds }, available: true },
      }),
      this.prisma.productVariant.findMany({
        where: { id: { in: variantIds } },
      }),
      this.prisma.topping.findMany({
        where: { id: { in: allToppingIds }, available: true },
      }),
    ]);

    const productMap = new Map(products.map((p) => [p.id, p]));
    const variantMap = new Map(variants.map((v) => [v.id, v]));
    const toppingMap = new Map(toppings.map((t) => [t.id, t]));

    let totalAmountVal = 0;
    const itemsData = dto.items.map((item) => {
      const prod = productMap.get(item.product_id);
      if (!prod)
        throw new BadRequestException(
          `Sản phẩm ${item.product_id} không tồn tại`,
        );

      let unitPrice = 0;
      if (item.variant_id) {
        const variant = variantMap.get(item.variant_id);
        if (!variant)
          throw new BadRequestException(
            `Size không hợp lệ cho sản phẩm ${prod.name_vi}`,
          );
        unitPrice = variant.price;
      } else {
        throw new BadRequestException(
          `Vui lòng chọn size cho sản phẩm ${prod.name_vi}`,
        );
      }

      let itemSubtotal = unitPrice * item.quantity;
      const selectedToppings = (item.topping_ids || []).map((tid) => {
        const t = toppingMap.get(tid);
        if (!t) throw new BadRequestException(`Topping ${tid} không tồn tại`);
        itemSubtotal += t.price * item.quantity;
        return { topping_id: t.id, name: t.name, price: t.price };
      });

      totalAmountVal += itemSubtotal;
      return {
        product_id: prod.id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        unit_price: unitPrice,
        subtotal: itemSubtotal,
        toppings: { create: selectedToppings },
      };
    });

    const discountAmountVal = dto.discount_amount || 0;
    const finalAmountVal = Math.max(0, totalAmountVal - discountAmountVal);

    const todayStr = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Asia/Ho_Chi_Minh',
    }).format(new Date());
    const ddmm = todayStr.substring(0, 2) + todayStr.substring(3, 5);

    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          order_number: `TONY-${ddmm}-${uuidv4().split('-')[0].toUpperCase()}`,
          total_amount: totalAmountVal,
          discount_amount: discountAmountVal,
          final_amount: finalAmountVal,
          payment_method: dto.payment_method,
          status: orderType === 'DINE_IN' ? 'PENDING' : 'COMPLETED',
          order_type: orderType,
          source: source,
          branch_id: dto.branch_id,
          table_id: tableId,
          items: { create: itemsData },
        },
        include: {
          items: { include: { product: true, variant: true, toppings: true } },
        },
      });

      // Track Material usage via BOM
      const enrichedItems = dto.items.map((item) => ({
        ...item,
        product_name: productMap.get(item.product_id)?.name_vi || 'Sản phẩm',
      }));
      await this.materialService.deductStockForOrder(
        order.id,
        order.order_number,
        enrichedItems,
        tx,
      );

      if (tableId) {
        await tx.table.update({
          where: { id: tableId },
          data: { status: 'OCCUPIED' },
        });
      }

      return order;
    });
  }

  async findAll(params: {
    branch_id?: string;
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) {
    const { branch_id, page = 1, limit = 20, status, search } = params;
    const skip = (page - 1) * limit;
    const where: any = {};
    if (branch_id) where.branch_id = branch_id;
    if (status) where.status = status;
    if (search) {
      where.order_number = { contains: search, mode: 'insensitive' };
    }

    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { created_at: 'desc' },
        include: {
          branch: true,
          items: { include: { product: true, variant: true, toppings: true } },
        },
      }),
      this.prisma.order.count({ where }),
    ]);
    return {
      data,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        branch: true,
        items: { include: { product: true, variant: true, toppings: true } },
      },
    });
    if (!order) throw new NotFoundException(`Order ${id} không tồn tại`);
    return order;
  }

  async addItemsToOrder(id: string, items: any[], paymentMethod?: string) {
    const order = await this.findOne(id);

    const productIds = items.map((i) => i.product_id);
    const variantIds = items
      .filter((i) => i.variant_id)
      .map((i) => i.variant_id as string);
    const allToppingIds = items.flatMap((i) => i.topping_ids || []);

    const [products, variants, toppings] = await Promise.all([
      this.prisma.product.findMany({ where: { id: { in: productIds } } }),
      this.prisma.productVariant.findMany({
        where: { id: { in: variantIds } },
      }),
      this.prisma.topping.findMany({ where: { id: { in: allToppingIds } } }),
    ]);

    const productMap = new Map(products.map((p) => [p.id, p]));
    const variantMap = new Map(variants.map((v) => [v.id, v]));
    const toppingMap = new Map(toppings.map((t) => [t.id, t]));

    let extraTotal = 0;
    const itemsData = items.map((item) => {
      const prod = productMap.get(item.product_id);
      if (!prod)
        throw new BadRequestException(
          `Sản phẩm ${item.product_id} không tồn tại`,
        );

      const variant = variantMap.get(item.variant_id);
      const unitPrice = variant ? variant.price : (prod as any).price || 0;

      let itemSubtotal = unitPrice * item.quantity;
      const selectedToppings = (item.topping_ids || []).map((tid) => {
        const t = toppingMap.get(tid);
        if (!t) throw new BadRequestException(`Topping ${tid} không tồn tại`);
        itemSubtotal += t.price * item.quantity;
        return { topping_id: t.id, name: t.name, price: t.price };
      });

      extraTotal += itemSubtotal;
      return {
        order_id: id,
        product_id: prod.id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        unit_price: unitPrice,
        subtotal: itemSubtotal,
        toppings: { create: selectedToppings },
      };
    });

    return this.prisma.$transaction(async (tx) => {
      // Create new items
      for (const itemData of itemsData) {
        await tx.orderItem.create({ data: itemData });
      }

      // Update order total
      const updatedOrder = await tx.order.update({
        where: { id },
        data: {
          total_amount: { increment: extraTotal },
          final_amount: { increment: extraTotal },
          ...(paymentMethod ? { payment_method: paymentMethod } : {}),
        },
        include: {
          items: { include: { product: true, variant: true, toppings: true } },
        },
      });

      // Deduct materials
      const enrichedItems = items.map((item) => ({
        ...item,
        product_name: productMap.get(item.product_id)?.name_vi || 'Sản phẩm',
      }));
      await this.materialService.deductStockForOrder(
        id,
        updatedOrder.order_number,
        enrichedItems,
        tx,
      );

      return updatedOrder;
    });
  }

  async getDashboardStats(
    branch_id?: string,
    startDateStr?: string,
    endDateStr?: string,
  ) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    let rangeStart = new Date();
    rangeStart.setDate(rangeStart.getDate() - 7);
    rangeStart.setHours(0, 0, 0, 0);

    let rangeEnd = new Date(tomorrow);

    if (startDateStr) {
      rangeStart = new Date(startDateStr);
      rangeStart.setHours(0, 0, 0, 0);
    }
    if (endDateStr) {
      rangeEnd = new Date(endDateStr);
      rangeEnd.setHours(23, 59, 59, 999);
    }

    const where: any = { created_at: { gte: rangeStart, lte: rangeEnd } };
    if (branch_id) where.branch_id = branch_id;

    const [periodStats, topProductsRaw] = await Promise.all([
      this.prisma.order.aggregate({
        _sum: {
          total_amount: true,
          discount_amount: true,
          final_amount: true,
        },
        _count: { id: true },
        where,
      }),
      this.prisma.orderItem.groupBy({
        by: ['product_id'],
        where: { order: where },
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: 'desc' } },
        take: 5,
      }),
    ]);

    const productIds = topProductsRaw.map((p: any) => p.product_id);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name_vi: true },
    });

    const top_products = topProductsRaw.map((tp: any) => ({
      name:
        products.find((pr: any) => pr.id === tp.product_id)?.name_vi ||
        'Ẩn danh',
      count: tp._sum.quantity,
    }));

    const hourlyMap: Record<string, { products: number; toppings: number }> =
      {};
    for (let h = 0; h <= 23; h++) {
      hourlyMap[h.toString().padStart(2, '0') + ':00'] = {
        products: 0,
        toppings: 0,
      };
    }

    const revenueMap: Record<string, number> = {};
    const daysDiff = Math.ceil(
      (rangeEnd.getTime() - rangeStart.getTime()) / (1000 * 60 * 60 * 24),
    );

    for (let i = 0; i <= daysDiff; i++) {
      const d = new Date(rangeStart);
      d.setDate(rangeStart.getDate() + i);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const key = `${y}-${m}-${day}`;
      revenueMap[key] = 0;
    }

    const sum = periodStats._sum;

    const diffMs = rangeEnd.getTime() - rangeStart.getTime();
    const prevRangeStart = new Date(rangeStart.getTime() - diffMs);
    const prevRangeEnd = new Date(rangeStart.getTime() - 1);

    const prevWhere: any = {
      created_at: { gte: prevRangeStart, lte: prevRangeEnd },
    };
    if (branch_id) prevWhere.branch_id = branch_id;

    const prevStats = await this.prisma.order.aggregate({
      _sum: { final_amount: true },
      _count: { id: true },
      where: prevWhere,
    });

    const calculateChange = (current: number, previous: number) => {
      if (!previous || previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    return {
      total_orders: periodStats._count.id,
      total_revenue: sum.total_amount || 0,
      total_discount: sum.discount_amount || 0,
      total_net_revenue: sum.final_amount || 0,
      revenue_by_day: Object.entries(revenueMap)
        .map(([date, revenue]) => ({ date, revenue }))
        .sort((a, b) => a.date.localeCompare(b.date)),
      top_products,
      transaction_count_by_hour: Object.entries(hourlyMap)
        .map(([hour, counts]) => ({
          hour,
          products: counts.products,
          toppings: counts.toppings,
        }))
        .sort((a, b) => a.hour.localeCompare(b.hour)),
      comparison: {
        prev_total_orders: prevStats._count.id,
        prev_total_net_revenue: prevStats._sum.final_amount || 0,
        orders_change_percent: calculateChange(
          periodStats._count.id,
          prevStats._count.id,
        ),
        revenue_change_percent: calculateChange(
          sum.final_amount || 0,
          prevStats._sum.final_amount || 0,
        ),
      },
    };
  }

  async incrementPrintCount(id: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException(`Order ${id} không tồn tại`);

    return this.prisma.order.update({
      where: { id },
      data: { print_count: { increment: 1 } },
      include: {
        branch: true,
        items: { include: { product: true, variant: true, toppings: true } },
      },
    });
  }
}
