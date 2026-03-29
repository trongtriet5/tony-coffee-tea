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
    const products: DbProduct[] = await p.product.findMany({ where: { id: { in: productIds }, isAvailable: true } });
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
         return { toppingId: t.id, name: t.name, price: t.price };
      });

      totalAmountVal += itemSubtotal;
      return {
        productId: prod.id,
        quantity: item.quantity,
        unitPrice: prod.price,
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
          orderNumber: `ORD-${Date.now().toString().slice(-4)}-${nanoid(4).toUpperCase()}`,
          totalAmount: totalAmountVal,
          discountAmount: discountAmountVal,
          finalAmount: finalAmountVal,
          paymentMethod: dto.payment_method,
          items: {
            create: itemsData
          },
          vouchers: { connect: voucherIds.map(id => ({ id })) }
        },
        include: { items: { include: { product: true, toppings: true } }, vouchers: true }
      });

      if (voucherIds.length) {
        await tx.voucher.updateMany({ where: { id: { in: voucherIds } }, data: { status: 'USED', usedAt: new Date() } });
      }
      return order;
    });
  }

  async findAll(params: { page?: number; limit?: number; status?: string }) {
    const { page = 1, limit = 20, status } = params;
    const skip = (page - 1) * limit;
    const where: any = {};
    if (status) where.status = status;

    const p: any = this.prisma;
    const [data, total] = await Promise.all([
      p.order.findMany({
        where, skip, take: limit, orderBy: { createdAt: 'desc' },
        include: { items: { include: { product: true, toppings: true } }, vouchers: true }
      }),
      p.order.count({ where })
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
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

  async getDashboardStats() {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const last7Days = new Date(); last7Days.setDate(last7Days.getDate() - 7);

    const p: any = this.prisma;
    
    const [todayStats, allStats, topProductsRaw] = await Promise.all([
      p.order.aggregate({
        _sum: { totalAmount: true, discountAmount: true, finalAmount: true },
        _count: { id: true },
        where: { createdAt: { gte: today } }
      }),
      p.order.findMany({
        where: { createdAt: { gte: last7Days } },
        select: { createdAt: true, finalAmount: true }
      }),
      p.orderItem.groupBy({
        by: ['productId'],
        where: { order: { createdAt: { gte: today } } },
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: 'desc' } },
        take: 5
      })
    ]);

    const productIds = topProductsRaw.map((p: any) => p.productId);
    const products = await p.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, nameVi: true }
    });
    
    const top_products = topProductsRaw.map((tp: any) => ({
      name: products.find((pr: any) => pr.id === tp.productId)?.nameVi || 'Ẩn danh',
      count: tp._sum.quantity
    }));

    const revenueMap: Record<string, number> = {};
    for (let i = 0; i < 7; i++) {
        const d = new Date(); d.setDate(d.getDate() - i);
        revenueMap[d.toISOString().slice(0, 10)] = 0;
    }
    
    allStats.forEach((o: any) => {
      const dateKey = o.createdAt.toISOString().slice(0, 10);
      if (revenueMap[dateKey] !== undefined) revenueMap[dateKey] += o.finalAmount;
    });

    const revenue_by_day = Object.entries(revenueMap)
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const sum = todayStats._sum;
    return {
      today_orders: todayStats._count.id,
      today_revenue: sum.totalAmount || 0,
      today_discount: sum.discountAmount || 0,
      today_net_revenue: sum.finalAmount || 0,
      revenue_by_day,
      top_products
    };
  }
}
