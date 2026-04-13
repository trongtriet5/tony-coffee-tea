import { Injectable, BadRequestException } from '@nestjs/common';
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
        let productHasRecipe = false;
        const enrichedVariants = await Promise.all(
          p.variants.map(async (v) => {
            const recipes = await this.prisma.productRecipe.findMany({ where: { variant_id: v.id } });
            if (recipes.length > 0) productHasRecipe = true;
            const cost = await this.materialService.getRecipeCost(v.id);
            return { ...v, cost, has_recipe: recipes.length > 0 };
          }),
        );
        return { ...p, variants: enrichedVariants, has_recipe: productHasRecipe };
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
        const recipes = await this.prisma.toppingRecipe.findMany({ where: { topping_id: t.id } });
        const cost = await this.materialService.getRecipeCost(undefined, t.id);
        return { ...t, cost, has_recipe: recipes.length > 0 };
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

  async deleteProduct(id: string) {
    // Check if product is in any order history
    const orderItemCount = await this.prisma.orderItem.count({ where: { product_id: id } });
    if (orderItemCount > 0) {
      throw new BadRequestException('Sản phẩm đã có trong lịch sử đơn hàng, không thể xóa hoàn toàn. Vui lòng tắt "Khả dụng" để ẩn món.');
    }

    // Delete variants first (and their recipes)
    const variants = await this.prisma.productVariant.findMany({ where: { product_id: id } });
    for (const v of variants) {
      await this.prisma.productRecipe.deleteMany({ where: { variant_id: v.id } });
    }
    await this.prisma.productVariant.deleteMany({ where: { product_id: id } });
    return this.prisma.product.delete({ where: { id } });
  }

  async deleteTopping(id: string) {
    // Check if topping is in any order history
    const orderItemToppingCount = await this.prisma.orderItemTopping.count({ where: { topping_id: id } });
    if (orderItemToppingCount > 0) {
      throw new BadRequestException('Topping đã có trong lịch sử đơn hàng, không thể xóa hoàn toàn. Vui lòng tắt "Khả dụng" để ẩn.');
    }

    await this.prisma.toppingRecipe.deleteMany({ where: { topping_id: id } });
    return this.prisma.topping.delete({ where: { id } });
  }
}
