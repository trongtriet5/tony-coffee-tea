import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MaterialService } from '../material/material.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly materialService: MaterialService,
  ) {}

  async findAll(includeUnavailable?: boolean) {
    const products = await this.prisma.product.findMany({
      where: includeUnavailable ? undefined : { available: true },
      include: { variants: true },
      orderBy: [{ category: 'asc' }, { name_vi: 'asc' }],
    });

    // Append cost calculation to each variant
    const enrichedProducts = await Promise.all(
      products.map(async (p) => {
        const enrichedVariants = await Promise.all(
          p.variants.map(async (v) => {
            const cost = await this.materialService.getRecipeCost(v.id);
            return { ...v, cost };
          }),
        );
        return { ...p, variants: enrichedVariants };
      }),
    );

    return enrichedProducts;
  }

  async getToppings(includeUnavailable?: boolean) {
    const toppings = await this.prisma.topping.findMany({
      where: includeUnavailable ? undefined : { available: true },
      orderBy: { name: 'asc' },
    });

    return Promise.all(
      toppings.map(async (t) => {
        const cost = await this.materialService.getRecipeCost(undefined, t.id);
        return { ...t, cost };
      }),
    );
  }

  async getCategories() {
    const results = await this.prisma.product.groupBy({
      by: ['category'],
      where: { available: true },
      _count: true,
    });
    return results.map((r) => ({ category: r.category, count: r._count }));
  }

  async createProduct(data: any) {
    return this.prisma.product.create({
      data: {
        name_vi: data.name_vi,
        name_en: data.name_en,
        category: data.category,
        available: data.available ?? true,
        variants: {
          create: data.variants || [], // Variants contain size and price
        },
      },
      include: { variants: true },
    });
  }

  async updateProduct(id: string, data: any) {
    return this.prisma.product.update({
      where: { id },
      data: {
        name_vi: data.name_vi,
        name_en: data.name_en,
        category: data.category,
        available: data.available,
      },
    });
  }

  async createTopping(data: any) {
    return this.prisma.topping.create({
      data: {
        name: data.name,
        price: data.price,
        available: data.available ?? true,
      },
    });
  }

  async updateTopping(id: string, data: any) {
    return this.prisma.topping.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        available: data.available,
      },
    });
  }

  // Import/Export Logic
  async exportMenu() {
    const products = await this.findAll(true);
    const toppings = await this.getToppings(true);
    return { products, toppings };
  }

  async importMenu(data: { products: any[]; toppings: any[] }) {
    for (const p of data.products) {
      await this.createProduct(p);
    }
    for (const t of data.toppings) {
      await this.createTopping(t);
    }
    return { success: true };
  }
}
