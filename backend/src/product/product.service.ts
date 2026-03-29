import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany({ 
      where: { available: true },
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

  async getToppings() {
    return this.prisma.topping.findMany({ where: { available: true } });
  }
}
