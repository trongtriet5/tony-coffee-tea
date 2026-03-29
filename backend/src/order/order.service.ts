import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VoucherService } from '../voucher/voucher.service';
import { CreateOrderDto } from './dto/order.dto';
import { nanoid } from 'nanoid';

// Local interfaces to solve TypeScript strict checking with Prisma naming sync issues
interface DbProduct {
  id: string;
  name_vi: string;
  price: number;
}

interface DbTopping {
  id: string;
  name: string;
  price: number;
}

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly voucherService: VoucherService,
  ) {}

  async create(dto: CreateOrderDto) {
    const productIds = dto.items.map((i) => i.product_id);
    const allToppingIds = dto.items.flatMap((i) => i.topping_ids || []);

    const p: any = this.prisma;
    
    // Explicitly fetch and cast for TS
    const products: DbProduct[] = await p.product.findMany({ where: { id: { in: productIds }, available: true } });
    const toppings: DbTopping[] = await p.topping.findMany({ where: { id: { in: allToppingIds }, available: true } });

    const productMap = new Map<string, DbProduct>(products.map((p) => [p.id, p]));
    const toppingMap = new Map<string, DbTopping>(toppings.map((t) => [t.id, t]));

    let totalAmountVal = 0;
    const itemsData = dto.items.map((item) => {
      const prod = productMap.get(item.product_id);
      if (!prod) throw new BadRequestException(`Sản phẩm ${item.product_id} không tồn tại`);

      let itemSubtotal = prod.price * item.quantity;
      const selectedToppings = (item.topping_ids || []).map((tid) => {
         const t = toppingMap.get(tid);
         if (!t) throw new BadRequestException(`Topping ${tid} không tồn tại`);
         itemSubtotal += t.price * item.quantity;
         return { topping_id: t.id, name: t.name, price: t.price };
      });

      totalAmountVal += itemSubtotal;
      return {
        product_id: prod.id,
        quantity: item.quantity,
        unit_price: prod.price,
        subtotal: itemSubtotal,
        toppings: { create: selectedToppings }
      };
    });

    let discountAmountVal = 0;
    const voucherIds: string[] = [];
    if (dto.voucher_codes?.length) {
      for (const code of dto.voucher_codes) {
        const v = await this.voucherService.validate(code);
        discountAmountVal += v.amount;
        voucherIds.push(v.id);
      }
    }
    discountAmountVal = Math.min(discountAmountVal, totalAmountVal);
    const finalAmountVal = totalAmountVal - discountAmountVal;

    return this.prisma.$transaction(async (tx: any) => {
      const order = await tx.order.create({
        data: {
          order_number: `ORD-${Date.now().toString().slice(-4)}-${nanoid(4).toUpperCase()}`,
          total_amount: totalAmountVal,
          discount_amount: discountAmountVal,
          final_amount: finalAmountVal,
          payment_method: dto.payment_method,
          items: {
            create: itemsData
          },
          vouchers: { connect: voucherIds.map(id => ({ id })) }
        },
        include: { items: { include: { product: true, toppings: true } }, vouchers: true }
      });

      if (voucherIds.length) {
        await tx.voucher.updateMany({ where: { id: { in: voucherIds } }, data: { status: 'USED', used_at: new Date() } });
      }
      return order;
    });
  }

  async findAll(params: { page?: number; limit?: number; status?: string; search?: string }) {
    const { page = 1, limit = 20, status, search } = params;
    const skip = (page - 1) * limit;
    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.order_number = { contains: search, mode: 'insensitive' };
    }

    const p: any = this.prisma;
    const [data, total] = await Promise.all([
      p.order.findMany({
        where, skip, take: Number(limit), orderBy: { created_at: 'desc' },
        include: { items: { include: { product: true, toppings: true } }, vouchers: true }
      }),
      p.order.count({ where })
    ]);
    return { data, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const p: any = this.prisma;
    const order = await p.order.findUnique({
      where: { id },
      include: { items: { include: { product: true, toppings: true } }, vouchers: true }
    });
    if (!order) throw new NotFoundException(`Order ${id} không tồn tại`);
    return order;
  }

  async getDashboardStats(startDateStr?: string, endDateStr?: string) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
    
    // Determine the primary range for calculations
    let rangeStart = new Date();
    rangeStart.setDate(rangeStart.getDate() - 7); // Default 7d
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

    const p: any = this.prisma;
    
    const [periodStats, allStatsInPeriod, topProductsRaw, ordersInPeriod] = await Promise.all([
      p.order.aggregate({
        _sum: { total_amount: true, discount_amount: true, final_amount: true },
        _count: { id: true },
        where: { created_at: { gte: rangeStart, lte: rangeEnd } }
      }),
      p.order.findMany({
        where: { created_at: { gte: rangeStart, lte: rangeEnd } },
        select: { created_at: true, final_amount: true }
      }),
      p.orderItem.groupBy({
        by: ['product_id'],
        where: { order: { created_at: { gte: rangeStart, lte: rangeEnd } } },
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: 'desc' } },
        take: 5
      }),
      p.order.findMany({
        where: { created_at: { gte: rangeStart, lte: rangeEnd } },
        select: { created_at: true, items: { select: { quantity: true } } }
      })
    ]);

    const productIds = topProductsRaw.map((p: any) => p.product_id);
    const products = await p.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name_vi: true }
    });
    
    const top_products = topProductsRaw.map((tp: any) => ({
      name: products.find((pr: any) => pr.id === tp.product_id)?.name_vi || 'Ẩn danh',
      count: tp._sum.quantity
    }));

    // Hourly analysis - aggregated over the selected period
    const hourlyMap: Record<string, number> = {};
    for (let h = 8; h <= 23; h++) {
        hourlyMap[h.toString().padStart(2, '0') + ':00'] = 0;
    }

    ordersInPeriod.forEach((o: any) => {
        const d = new Date(o.created_at);
        // Lấy chính xác giờ literal từ database (do Prisma query về dưới dạng UTC)
        const hour = d.getUTCHours();
        const key = hour.toString().padStart(2, '0') + ':00';
        if (hourlyMap[key] !== undefined) {
            const itemsInOrder = o.items.reduce((s: number, i: any) => s + i.quantity, 0);
            hourlyMap[key] += itemsInOrder;
        }
    });

    const transaction_count_by_hour = Object.entries(hourlyMap)
        .map(([hour, count]) => ({ hour, count }))
        .sort((a, b) => a.hour.localeCompare(b.hour));

    // Revenue distribution by day over the range
    const revenueMap: Record<string, number> = {};
    const daysDiff = Math.ceil((rangeEnd.getTime() - rangeStart.getTime()) / (1000 * 60 * 60 * 24));
    
    for (let i = 0; i <= daysDiff; i++) {
        const d = new Date(rangeStart);
        d.setDate(rangeStart.getDate() + i);
        const key = d.toISOString().slice(0, 10);
        revenueMap[key] = 0;
    }
    
    allStatsInPeriod.forEach((o: any) => {
      const dateKey = o.created_at.toISOString().slice(0, 10);
      if (revenueMap[dateKey] !== undefined) revenueMap[dateKey] += o.final_amount;
    });

    const revenue_by_day = Object.entries(revenueMap)
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const sum = periodStats._sum;
    return {
      today_orders: periodStats._count.id, // Period orders
      today_revenue: sum.total_amount || 0,
      today_discount: sum.discount_amount || 0,
      today_net_revenue: sum.final_amount || 0,
      revenue_by_day,
      top_products,
      transaction_count_by_hour
    };
  }
}
