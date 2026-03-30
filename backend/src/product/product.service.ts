import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(includeUnavailable?: boolean) {
    return this.prisma.product.findMany({ 
      where: includeUnavailable ? undefined : { available: true },
      orderBy: [{ category: 'asc' }, { name_vi: 'asc' }]
    });
  }

  async getCategories() {
    const results = await this.prisma.product.groupBy({
      by: ['category'],
      where: { available: true },
      _count: true,
    });
    return results.map((r) => ({ category: r.category, count: r._count }));
  }

  async getToppings(includeUnavailable?: boolean) {
    return this.prisma.topping.findMany({ 
      where: includeUnavailable ? undefined : { available: true },
      orderBy: { name: 'asc' }
    });
  }

  async createProduct(data: any) {
    return this.prisma.product.create({
      data: {
        name_vi: data.name_vi,
        name_en: data.name_en,
        price: data.price,
        category: data.category,
        available: data.available ?? true,
      }
    });
  }

  async createTopping(data: any) {
    return this.prisma.topping.create({
      data: {
        name: data.name,
        price: data.price,
        available: data.available ?? true,
      }
    });
  }

  async updateProduct(id: string, data: any) {
    return this.prisma.product.update({
      where: { id },
      data: {
        name_vi: data.name_vi,
        name_en: data.name_en,
        price: data.price,
        category: data.category,
        available: data.available,
      }
    });
  }

  async updateTopping(id: string, data: any) {
    return this.prisma.topping.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        available: data.available,
      }
    });
  }
}
