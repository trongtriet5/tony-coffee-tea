import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as XLSX from 'xlsx';
import {
  CreateMaterialDto,
  UpdateMaterialDto,
  MaterialTransactionDto,
  MaterialResponseDto,
} from './dto/material.dto';

@Injectable()
export class MaterialService {
  constructor(private prisma: PrismaService) {}

  async createMaterial(dto: CreateMaterialDto): Promise<MaterialResponseDto> {
    const material = await this.prisma.material.create({
      data: {
        name: dto.name,
        branch_id: dto.branch_id,
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

  async getAllMaterials(branchId?: string): Promise<MaterialResponseDto[]> {
    const materials = await this.prisma.material.findMany({
      where: { branch_id: branchId },
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
        product_recipes: {
          include: {
            variant: true,
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

  /**
   * BOM Logic: Deducts stock based on recipes for an entire order.
   * This is usually called from OrderService inside a transaction.
   */
  async deductStockForOrder(
    orderId: string,
    items: any[],
    tx?: any,
  ): Promise<void> {
    const prisma = tx || this.prisma;

    for (const item of items) {
      // 1. Deduct for Product Variant (Size)
      if (item.variant_id) {
        const recipes = await prisma.productRecipe.findMany({
          where: { variant_id: item.variant_id },
        });

        for (const recipe of recipes) {
          const amountUsed = recipe.quantity * item.quantity;
          await this.updateStockInternal(
            recipe.material_id,
            amountUsed,
            `Order ${item.order_number || orderId} - Product`,
            prisma,
          );
        }
      }

      // 2. Deduct for Toppings
      if (item.topping_ids && item.topping_ids.length > 0) {
        for (const toppingId of item.topping_ids) {
          const recipes = await prisma.toppingRecipe.findMany({
            where: { topping_id: toppingId },
          });

          for (const recipe of recipes) {
            const amountUsed = recipe.quantity * item.quantity;
            await this.updateStockInternal(
              recipe.material_id,
              amountUsed,
              `Order ${item.order_number || orderId} - Topping`,
              prisma,
            );
          }
        }
      }
    }
  }

  private async updateStockInternal(
    materialId: string,
    amount: number,
    note: string,
    prisma: any,
  ): Promise<void> {
    const updatedMaterial = await prisma.material.update({
      where: { id: materialId },
      data: { stock_current: { decrement: amount } },
    });

    await prisma.materialTransaction.create({
      data: {
        material_id: materialId,
        type: 'USED',
        quantity: amount,
        note: note,
      },
    });

    await this.handleAutoOffItems(materialId, updatedMaterial.stock_current, prisma);
  }

  private async handleAutoOffItems(
    materialId: string,
    newStock: number,
    prismaTx: any,
  ): Promise<void> {
    if (newStock <= 0) {
      // Find variants that use this material
      const productRecipes = await prismaTx.productRecipe.findMany({
        where: { material_id: materialId },
        include: { variant: true }
      });
      const productIds = Array.from(new Set(productRecipes.map((r: any) => r.variant.product_id)));
      if (productIds.length > 0) {
        await prismaTx.product.updateMany({
          where: { id: { in: productIds as string[] } },
          data: { available: false }
        });
      }

      // Find toppings that use this material
      const toppingRecipes = await prismaTx.toppingRecipe.findMany({
        where: { material_id: materialId }
      });
      const toppingIds = toppingRecipes.map((r: any) => r.topping_id);
      if (toppingIds.length > 0) {
        await prismaTx.topping.updateMany({
          where: { id: { in: toppingIds as string[] } },
          data: { available: false }
        });
      }
    }
  }

  async updateMaterial(
    id: string,
    dto: UpdateMaterialDto,
  ): Promise<MaterialResponseDto> {
    const currentMaterial = await this.prisma.material.findUnique({
      where: { id },
    });
    if (!currentMaterial)
      throw new NotFoundException(`Material ${id} not found`);

    const data: any = { ...dto };
    const stockChanged =
      dto.stock_current !== undefined &&
      dto.stock_current !== currentMaterial.stock_current;

    const material = await this.prisma.material.update({
      where: { id },
      data,
    });

    // Record ADJUST transaction if stock was manually changed
    if (stockChanged) {
      await this.prisma.materialTransaction.create({
        data: {
          material_id: id,
          type: 'ADJUST',
          quantity: (dto.stock_current || 0) - currentMaterial.stock_current,
          note: 'Manual stock update',
        },
      });
    }

    await this.handleAutoOffItems(id, material.stock_current, this.prisma);

    return this.formatMaterialResponse(material);
  }

  /**
   * Calculate COGS (Cost of Goods Sold) for a variant or topping.
   * e.g. 1kg cafe = 200k, 50g used = 10k cost.
   */
  async getRecipeCost(variantId?: string, toppingId?: string): Promise<number> {
    let totalCost = 0;

    if (variantId) {
      const recipes = await this.prisma.productRecipe.findMany({
        where: { variant_id: variantId },
        include: { material: true },
      });
      for (const r of recipes) {
        totalCost += r.quantity * r.material.cost_per_unit;
      }
    }

    if (toppingId) {
      const recipes = await this.prisma.toppingRecipe.findMany({
        where: { topping_id: toppingId },
        include: { material: true },
      });
      for (const r of recipes) {
        totalCost += r.quantity * r.material.cost_per_unit;
      }
    }

    return totalCost;
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
      throw new BadRequestException(
        'Cannot delete material that is used in recipes',
      );
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
      throw new NotFoundException(
        `Material with id ${dto.material_id} not found`,
      );
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

    await this.handleAutoOffItems(dto.material_id, newStock, this.prisma);

    return {
      transaction,
      material: this.formatMaterialResponse(updatedMaterial),
    };
  }

  async getMaterialTransactions(
    materialId: string,
    limit: number = 50,
  ): Promise<any[]> {
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

  async getMaterialInventoryReport(
    startDate?: Date,
    endDate?: Date,
  ): Promise<any> {
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
        total_stock_value: materials.reduce(
          (sum, m) => sum + m.stock_current * m.cost_per_unit,
          0,
        ),
      },
    };

    return report;
  }

  // --- IMPORT / EXPORT METHODS ---

  async generateTemplate(): Promise<Buffer> {
    const wb = XLSX.utils.book_new();

    // Sheet 1: Import Data
    const wsData = [
      ['Tên nguyên liệu', 'Đơn vị', 'Giá vốn/Đơn vị', 'Tồn kho khởi tạo'],
      ['Cà phê hạt', 'kg', 250000, 10],
      ['Sữa đặc', 'lon', 18000, 24],
      ['Trà ô long', 'g', 500, 1000],
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Import');

    // Sheet 2: Definition
    const wsDefData = [
      ['Tên cột', 'Mô tả', 'Loại dữ liệu', 'Bắt buộc'],
      ['Tên nguyên liệu', 'Tên của nguyên vật liệu (ví dụ: Cafe, Đường)', 'Chuỗi văn bản', 'Có'],
      ['Đơn vị', 'Đơn vị tính (kg, g, lon, hộp...)', 'Chuỗi văn bản', 'Có'],
      ['Giá vốn/Đơn vị', 'Giá nhập của 1 đơn vị tính', 'Số', 'Có'],
      ['Tồn kho khởi tạo', 'Số lượng tồn kho ban đầu khi mới tạo', 'Số', 'Không (mặc định 0)'],
    ];
    const wsDef = XLSX.utils.aoa_to_sheet(wsDefData);
    XLSX.utils.book_append_sheet(wb, wsDef, 'Hướng dẫn');

    return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  }

  async importMaterials(buffer: Buffer, branchId?: string): Promise<any> {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets['Import'] || workbook.Sheets[workbook.SheetNames[0]];
    const rawData: any[] = XLSX.utils.sheet_to_json(sheet);

    const results = {
      total: rawData.length,
      success: 0,
      errors: [] as string[],
    };

    for (const row of rawData) {
      const name = row['Tên nguyên liệu'];
      const unit = row['Đơn vị'];
      const cost = parseFloat(row['Giá vốn/Đơn vị']);
      const initialStock = parseFloat(row['Tồn kho khởi tạo'] || 0);

      if (!name || !unit || isNaN(cost)) {
        results.errors.push(`Dòng "${name || 'Không tên'}": Thiếu thông tin bắt buộc hoặc giá không hợp lệ`);
        continue;
      }

      try {
        await this.createMaterial({
          name,
          unit,
          cost_per_unit: cost,
          initial_stock: initialStock,
          branch_id: branchId!,
        });
        results.success++;
      } catch (err) {
        results.errors.push(`Dòng "${name}": ${err.message}`);
      }
    }

    return results;
  }

  async exportMaterials(branchId?: string): Promise<Buffer> {
    const materials = await this.prisma.material.findMany({
      where: { branch_id: branchId },
      orderBy: { name: 'asc' },
    });

    const data = materials.map((m) => ({
      'ID': m.id,
      'Tên nguyên liệu': m.name,
      'Đơn vị': m.unit,
      'Giá vốn': m.cost_per_unit,
      'Tồn kho hiện tại': m.stock_current,
      'Giá trị tồn kho': m.stock_current * m.cost_per_unit,
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Tồn kho');

    return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
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
