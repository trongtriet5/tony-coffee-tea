import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';

const CACHE_KEYS = {
  PRODUCTS_ALL: 'products:all',
  PRODUCTS_AVAILABLE: 'products:available',
  TOPPINGS_ALL: 'toppings:all',
  TOPPINGS_AVAILABLE: 'toppings:available',
  CATEGORIES: 'categories',
};

interface CachedProduct {
  id: string;
  name_vi: string;
  name_en: string;
  category: string;
  available: boolean;
  variants: any[];
  has_recipe: boolean;
}

interface CachedTopping {
  id: string;
  name: string;
  price: number;
  available: boolean;
  has_recipe: boolean;
}

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  async findAll(includeUnavailable?: boolean) {
    const cacheKey = includeUnavailable ? CACHE_KEYS.PRODUCTS_ALL : CACHE_KEYS.PRODUCTS_AVAILABLE;
    const cached = this.cache.get<CachedProduct[]>(cacheKey);
    if (cached) return cached;

    const products = await this.prisma.product.findMany({
      where: includeUnavailable ? undefined : { available: true },
      include: {
        variants: {
          include: {
            recipes: { take: 1 },
          },
        },
      },
      orderBy: [{ category: 'asc' }, { name_vi: 'asc' }],
    });

    const result = products.map((p) => {
      let productHasRecipe = false;
      const enrichedVariants = p.variants.map((v) => {
        const hasRecipe = v.recipes.length > 0;
        if (hasRecipe) productHasRecipe = true;
        return { ...v, cost: 0, has_recipe: hasRecipe };
      });
      return { ...p, variants: enrichedVariants, has_recipe: productHasRecipe };
    });

    this.cache.set(cacheKey, result);
    return result;
  }

  async getToppings(includeUnavailable?: boolean) {
    const cacheKey = includeUnavailable ? CACHE_KEYS.TOPPINGS_ALL : CACHE_KEYS.TOPPINGS_AVAILABLE;
    const cached = this.cache.get<CachedTopping[]>(cacheKey);
    if (cached) return cached;

    const toppings = await this.prisma.topping.findMany({
      where: includeUnavailable ? undefined : { available: true },
      include: { recipes: { take: 1 } },
      orderBy: { name: 'asc' },
    });

    const result = toppings.map((t) => ({
      ...t,
      cost: 0,
      has_recipe: t.recipes.length > 0,
    }));

    this.cache.set(cacheKey, result);
    return result;
  }

  async getCategories() {
    const cached = this.cache.get<{ category: string; count: number }[]>(CACHE_KEYS.CATEGORIES);
    if (cached) return cached;

    const results = await this.prisma.product.groupBy({
      by: ['category'],
      where: { available: true },
      _count: true,
    });
    const result = results.map((r) => ({ category: r.category, count: r._count }));
    this.cache.set(CACHE_KEYS.CATEGORIES, result);
    return result;
  }

  async createProduct(data: any) {
    const result = await this.prisma.product.create({
      data: {
        name_vi: data.name_vi,
        name_en: data.name_en,
        category: data.category,
        available: data.available ?? true,
        variants: {
          create: data.variants || [],
        },
      },
      include: { variants: true },
    });
    this.invalidateProductsCache();
    return result;
  }

  async updateProduct(id: string, data: any) {
    const result = await this.prisma.product.update({
      where: { id },
      data: {
        name_vi: data.name_vi,
        name_en: data.name_en,
        category: data.category,
        available: data.available,
      },
    });
    this.invalidateProductsCache();
    return result;
  }

  async createTopping(data: any) {
    const result = await this.prisma.topping.create({
      data: {
        name: data.name,
        price: data.price,
        available: data.available ?? true,
      },
    });
    this.invalidateToppingsCache();
    return result;
  }

  async updateTopping(id: string, data: any) {
    const result = await this.prisma.topping.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        available: data.available,
      },
    });
    this.invalidateToppingsCache();
    return result;
  }

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
    this.invalidateAllProductCaches();
    return { success: true };
  }

  async deleteProduct(id: string) {
    const orderItemCount = await this.prisma.orderItem.count({
      where: { product_id: id },
    });
    if (orderItemCount > 0) {
      throw new BadRequestException(
        'Sản phẩm đã có trong lịch sử đơn hàng, không thể xóa hoàn toàn. Vui lòng tắt "Khả dụng" để ẩn món.',
      );
    }

    const variants = await this.prisma.productVariant.findMany({
      where: { product_id: id },
    });
    for (const v of variants) {
      await this.prisma.productRecipe.deleteMany({
        where: { variant_id: v.id },
      });
    }
    await this.prisma.productVariant.deleteMany({ where: { product_id: id } });
    const result = await this.prisma.product.delete({ where: { id } });
    this.invalidateProductsCache();
    return result;
  }

  async deleteTopping(id: string) {
    const orderItemToppingCount = await this.prisma.orderItemTopping.count({
      where: { topping_id: id },
    });
    if (orderItemToppingCount > 0) {
      throw new BadRequestException(
        'Topping đã có trong lịch sử đơn hàng, không thể xóa hoàn toàn. Vui lòng tắt "Khả dụng" để ẩn.',
      );
    }

    await this.prisma.toppingRecipe.deleteMany({ where: { topping_id: id } });
    const result = await this.prisma.topping.delete({ where: { id } });
    this.invalidateToppingsCache();
    return result;
  }

  private invalidateProductsCache() {
    this.cache.invalidate(CACHE_KEYS.PRODUCTS_ALL);
    this.cache.invalidate(CACHE_KEYS.PRODUCTS_AVAILABLE);
    this.cache.invalidate(CACHE_KEYS.CATEGORIES);
  }

  private invalidateToppingsCache() {
    this.cache.invalidate(CACHE_KEYS.TOPPINGS_ALL);
    this.cache.invalidate(CACHE_KEYS.TOPPINGS_AVAILABLE);
  }

  private invalidateAllProductCaches() {
    this.cache.invalidatePattern('products');
    this.cache.invalidatePattern('toppings');
    this.cache.invalidate(CACHE_KEYS.CATEGORIES);
  }
}
