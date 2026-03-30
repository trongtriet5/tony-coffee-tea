import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMaterialDto, UpdateMaterialDto, MaterialTransactionDto, MaterialResponseDto } from './dto/material.dto';

@Injectable()
export class MaterialService {
  constructor(private prisma: PrismaService) {}

  async createMaterial(dto: CreateMaterialDto): Promise<MaterialResponseDto> {
    const material = await this.prisma.material.create({
      data: {
        name: dto.name,
        unit: dto.unit,
        cost_per_unit: dto.cost_per_unit,
        stock_current: dto.initial_stock || 0,
      },
    });

    // Nếu có initial stock, ghi lại transaction
    if (dto.initial_stock && dto.initial_stock > 0) {
      await this.prisma.materialTransaction.create({
        data: {
          material_id: material.id,
          type: 'IN',
          quantity: dto.initial_stock,
          note: 'Initial stock',
        },
      });
    }

    return this.formatMaterialResponse(material);
  }

  async getAllMaterials(): Promise<MaterialResponseDto[]> {
    const materials = await this.prisma.material.findMany({
      orderBy: { name: 'asc' },
    });
    return materials.map((m) => this.formatMaterialResponse(m));
  }

  async getMaterialById(id: string): Promise<MaterialResponseDto> {
    const material = await this.prisma.material.findUnique({
      where: { id },
      include: {
        transactions: {
          orderBy: { created_at: 'desc' },
          take: 20, // Get latest 20 transactions
        },
        recipes: {
          include: {
            product: true,
          },
        },
        topping_recipes: {
          include: {
            topping: true,
          },
        },
      },
    });

    if (!material) {
      throw new NotFoundException(`Material with id ${id} not found`);
    }

    return this.formatMaterialResponse(material);
  }

  async updateMaterial(id: string, dto: UpdateMaterialDto): Promise<MaterialResponseDto> {
    const material = await this.prisma.material.update({
      where: { id },
      data: dto,
    });

    return this.formatMaterialResponse(material);
  }

  async deleteMaterial(id: string): Promise<void> {
    // Check if material is used in recipes
    const recipes = await this.prisma.productRecipe.findMany({
      where: { material_id: id },
    });
    const toppingRecipes = await this.prisma.toppingRecipe.findMany({
      where: { material_id: id },
    });

    if (recipes.length > 0 || toppingRecipes.length > 0) {
      throw new BadRequestException('Cannot delete material that is used in recipes');
    }

    await this.prisma.material.delete({
      where: { id },
    });
  }

  // Material Transactions Management
  async addMaterialTransaction(dto: MaterialTransactionDto): Promise<any> {
    const material = await this.prisma.material.findUnique({
      where: { id: dto.material_id },
    });

    if (!material) {
      throw new NotFoundException(`Material with id ${dto.material_id} not found`);
    }

    // Calculate new stock
    let newStock = material.stock_current;
    if (dto.type === 'IN' || dto.type === 'ADJUST') {
      newStock += dto.quantity;
    } else if (dto.type === 'OUT' || dto.type === 'USED') {
      newStock -= dto.quantity;
      if (newStock < 0) {
        throw new BadRequestException(
          `Insufficient stock. Current: ${material.stock_current}, Requested: ${dto.quantity}`,
        );
      }
    }

    // Create transaction and update stock
    const [transaction, updatedMaterial] = await Promise.all([
      this.prisma.materialTransaction.create({
        data: {
          material_id: dto.material_id,
          type: dto.type,
          quantity: dto.quantity,
          note: dto.note,
        },
      }),
      this.prisma.material.update({
        where: { id: dto.material_id },
        data: { stock_current: newStock },
      }),
    ]);

    return {
      transaction,
      material: this.formatMaterialResponse(updatedMaterial),
    };
  }

  async getMaterialTransactions(materialId: string, limit: number = 50): Promise<any[]> {
    const material = await this.prisma.material.findUnique({
      where: { id: materialId },
    });

    if (!material) {
      throw new NotFoundException(`Material with id ${materialId} not found`);
    }

    return this.prisma.materialTransaction.findMany({
      where: { material_id: materialId },
      orderBy: { created_at: 'desc' },
      take: limit,
    });
  }

  async getMaterialInventoryReport(startDate?: Date, endDate?: Date): Promise<any> {
    const materials = await this.prisma.material.findMany({
      include: {
        transactions: {
          where: {
            ...(startDate && endDate
              ? {
                  created_at: {
                    gte: startDate,
                    lte: endDate,
                  },
                }
              : {}),
          },
        },
      },
    });

    const report = {
      date_range: {
        start: startDate || 'All time',
        end: endDate || 'All time',
      },
      materials: materials.map((material) => {
        const inQuantity = material.transactions
          .filter((t) => t.type === 'IN')
          .reduce((sum, t) => sum + t.quantity, 0);

        const outQuantity = material.transactions
          .filter((t) => t.type === 'OUT')
          .reduce((sum, t) => sum + t.quantity, 0);

        const usedQuantity = material.transactions
          .filter((t) => t.type === 'USED')
          .reduce((sum, t) => sum + t.quantity, 0);

        const adjustQuantity = material.transactions
          .filter((t) => t.type === 'ADJUST')
          .reduce((sum, t) => sum + t.quantity, 0);

        return {
          id: material.id,
          name: material.name,
          unit: material.unit,
          cost_per_unit: material.cost_per_unit,
          in: inQuantity,
          out: outQuantity,
          used: usedQuantity,
          adjust: adjustQuantity,
          current_stock: material.stock_current,
          stock_value: material.stock_current * material.cost_per_unit,
        };
      }),
      summary: {
        total_materials: materials.length,
        total_stock_value: materials.reduce((sum, m) => sum + m.stock_current * m.cost_per_unit, 0),
      },
    };

    return report;
  }

  private formatMaterialResponse(material: any): MaterialResponseDto {
    return {
      id: material.id,
      name: material.name,
      unit: material.unit,
      cost_per_unit: material.cost_per_unit,
      stock_current: material.stock_current,
      stock_value: material.stock_current * material.cost_per_unit,
      created_at: material.created_at,
    };
  }
}
