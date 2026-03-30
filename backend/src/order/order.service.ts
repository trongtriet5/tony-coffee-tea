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
    // Default order_type to TAKEAWAY if not provided
    const orderType = dto.order_type || 'TAKEAWAY';

    // Validate table_id for DINE_IN orders
    let tableId: string | null = null;
    if (orderType === 'DINE_IN') {
      if (!dto.table_id) {
        throw new BadRequestException('Table ID is required for dine-in orders');
      }
      const table = await this.prisma.table.findUnique({
        where: { id: dto.table_id },
      });
      if (!table) {
        throw new BadRequestException(`Table with id ${dto.table_id} not found`);
      }
      if (table.status !== 'AVAILABLE') {
        throw new BadRequestException(`Table ${table.name} is not available`);
      }
      tableId = dto.table_id;
    }

    const productIds = dto.items.map((i) => i.product_id);
    const allToppingIds = dto.items.flatMap((i) => i.topping_ids || []);

    const p: any = this.prisma;
    
    // Explicitly fetch and cast for TS
    const products: DbProduct[] = await p.product.findMany({ where: { id: { in: productIds }, available: true } });
    const toppings: DbTopping[] = await p.topping.findMany({ where: { id: { in: allToppingIds }, available: true } });

    const productMap = new Map<string, DbProduct>(products.map((p) => [p.id, p]));
    const toppingMap = new Map<string, DbTopping>(toppings.map((t) => [t.id, t]));

    // Get recipes for material tracking
    const productRecipes = await this.prisma.productRecipe.findMany({
      where: { product_id: { in: productIds } },
      include: { material: true },
    });

    const toppingRecipes = await this.prisma.toppingRecipe.findMany({
      where: { topping_id: { in: allToppingIds } },
      include: { material: true },
    });

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
          status: orderType === 'DINE_IN' ? 'PENDING' : 'COMPLETED',
          order_type: orderType,
          table_id: tableId,
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

      // Track material usage for each item
      for (const item of dto.items) {
        // Track product ingredients
        const prodRecipes = productRecipes.filter((r) => r.product_id === item.product_id);
        for (const recipe of prodRecipes) {
          const quantityUsed = recipe.quantity * item.quantity;
          
          // Update material stock
          await tx.material.update({
            where: { id: recipe.material_id },
            data: { stock_current: { decrement: quantityUsed } },
          });

          // Record transaction
          await tx.materialTransaction.create({
            data: {
              material_id: recipe.material_id,
              type: 'USED',
              quantity: quantityUsed,
              note: `Order ${order.order_number} - ${order.items.length} items`,
            },
          });
        }

        // Track topping ingredients
        const toppingIds = item.topping_ids || [];
        for (const toppingId of toppingIds) {
          const toppingRecipesForItem = toppingRecipes.filter((r) => r.topping_id === toppingId);
          for (const recipe of toppingRecipesForItem) {
            const quantityUsed = recipe.quantity * item.quantity;

            await tx.material.update({
              where: { id: recipe.material_id },
              data: { stock_current: { decrement: quantityUsed } },
            });

            await tx.materialTransaction.create({
              data: {
                material_id: recipe.material_id,
                type: 'USED',
                quantity: quantityUsed,
                note: `Order ${order.order_number} - Topping`,
              },
            });
          }
        }
      }

      // Update table status to OCCUPIED for dine-in orders
      if (tableId) {
        await tx.table.update({
          where: { id: tableId },
          data: { status: 'OCCUPIED' },
        });
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
        select: { created_at: true, items: { select: { quantity: true, toppings: true } } }
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
    const hourlyMap: Record<string, { products: number; toppings: number }> = {};
    for (let h = 0; h <= 23; h++) {
        hourlyMap[h.toString().padStart(2, '0') + ':00'] = { products: 0, toppings: 0 };
    }

    ordersInPeriod.forEach((o: any) => {
        // Use Intl.DateTimeFormat to force +7 (Asia/Ho_Chi_Minh) regardless of server timezone
        const d = new Date(o.created_at);
        const hourStr = new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            hour12: false,
            timeZone: 'Asia/Ho_Chi_Minh'
        }).format(d);
        
        const hour = parseInt(hourStr, 10);
        const key = hour.toString().padStart(2, '0') + ':00';
        if (hourlyMap[key] !== undefined) {
            let pCount = 0;
            let tCount = 0;
            o.items.forEach((i: any) => {
                pCount += i.quantity;
                if (i.toppings && Array.isArray(i.toppings)) {
                    tCount += (i.toppings.length * i.quantity);
                }
            });
            hourlyMap[key].products += pCount;
            hourlyMap[key].toppings += tCount;
        }
    });

    const transaction_count_by_hour = Object.entries(hourlyMap)
        .map(([hour, counts]) => ({ hour, products: counts.products, toppings: counts.toppings }))
        .sort((a, b) => a.hour.localeCompare(b.hour));

    // Revenue distribution by day over the range
    const revenueMap: Record<string, number> = {};
    const daysDiff = Math.ceil((rangeEnd.getTime() - rangeStart.getTime()) / (1000 * 60 * 60 * 24));
    
    for (let i = 0; i <= daysDiff; i++) {
        const d = new Date(rangeStart);
        d.setDate(rangeStart.getDate() + i);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const key = `${y}-${m}-${day}`;
        revenueMap[key] = 0;
    }
    
    allStatsInPeriod.forEach((o: any) => {
      const d = new Date(o.created_at);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateKey = `${y}-${m}-${day}`;
      
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

  async addItemsToOrder(orderId: string, items: any[], paymentMethod?: string) {
    const existingOrder = await this.findOne(orderId);
    if (!existingOrder) throw new NotFoundException(`Order ${orderId} not found`);

    const productIds = items.map((i) => i.product_id);
    const allToppingIds = items.flatMap((i) => i.topping_ids || []);

    const p: any = this.prisma;
    const products: DbProduct[] = await p.product.findMany({ where: { id: { in: productIds }, available: true } });
    const toppings: DbTopping[] = await p.topping.findMany({ where: { id: { in: allToppingIds }, available: true } });

    const productMap = new Map<string, DbProduct>(products.map((p) => [p.id, p]));
    const toppingMap = new Map<string, DbTopping>(toppings.map((t) => [t.id, t]));

    // Recipes for material tracking
    const productRecipes = await this.prisma.productRecipe.findMany({
      where: { product_id: { in: productIds } },
      include: { material: true },
    });
    const toppingRecipes = await this.prisma.toppingRecipe.findMany({
      where: { topping_id: { in: allToppingIds } },
      include: { material: true },
    });

    let extraAmount = 0;
    const itemsData = items.map((item) => {
      const prod = productMap.get(item.product_id);
      if (!prod) throw new BadRequestException(`Product ${item.product_id} not found`);

      let itemSubtotal = prod.price * item.quantity;
      const selectedToppings = (item.topping_ids || []).map((tid) => {
         const t = toppingMap.get(tid);
         if (!t) throw new BadRequestException(`Topping ${tid} not found`);
         itemSubtotal += t.price * item.quantity;
         return { topping_id: t.id, name: t.name, price: t.price };
      });

      extraAmount += itemSubtotal;
      return {
        product_id: prod.id,
        quantity: item.quantity,
        unit_price: prod.price,
        subtotal: itemSubtotal,
        toppings: { create: selectedToppings }
      };
    });

    return this.prisma.$transaction(async (tx: any) => {
      // Add items to existing order
      for (const itemData of itemsData) {
        await tx.orderItem.create({
          data: {
            ...itemData,
            order_id: orderId
          }
        });
      }

      const newTotal = existingOrder.total_amount + extraAmount;
      const newFinal = existingOrder.final_amount + extraAmount;

      await tx.order.update({
        where: { id: orderId },
        data: {
          total_amount: newTotal,
          final_amount: newFinal,
          payment_method: paymentMethod || existingOrder.payment_method
        }
      });

      // Track material usage
      for (const item of items) {
        const prodRecipes = productRecipes.filter((r) => r.product_id === item.product_id);
        for (const recipe of prodRecipes) {
          const quantityUsed = recipe.quantity * item.quantity;
          await tx.material.update({
            where: { id: recipe.material_id },
            data: { stock_current: { decrement: quantityUsed } },
          });
          await tx.materialTransaction.create({
            data: { material_id: recipe.material_id, type: 'USED', quantity: quantityUsed, note: `Add to Order ${existingOrder.order_number}` },
          });
        }

        const toppingIds = item.topping_ids || [];
        for (const toppingId of toppingIds) {
          const toppingRecipesForItem = toppingRecipes.filter((r) => r.topping_id === toppingId);
          for (const recipe of toppingRecipesForItem) {
            const quantityUsed = recipe.quantity * item.quantity;
            await tx.material.update({
              where: { id: recipe.material_id },
              data: { stock_current: { decrement: quantityUsed } },
            });
            await tx.materialTransaction.create({
              data: { material_id: recipe.material_id, type: 'USED', quantity: quantityUsed, note: `Add to Order ${existingOrder.order_number} - Topping` },
            });
          }
        }
      }

      return tx.order.findUnique({
        where: { id: orderId },
        include: { items: { include: { product: true, toppings: true } }, vouchers: true }
      });
    });
  }
}
