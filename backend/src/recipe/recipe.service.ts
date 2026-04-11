import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductRecipeDto, CreateToppingRecipeDto } from './dto/recipe.dto';
import * as XLSX from 'xlsx';

@Injectable()
export class RecipeService {
  constructor(private readonly prisma: PrismaService) {}

  // ============== Product Recipes ==============
  async createProductRecipe(dto: CreateProductRecipeDto) {
    return this.prisma.productRecipe.create({
      data: {
        variant_id: dto.variant_id,
        material_id: dto.material_id,
        quantity: dto.quantity,
      },
      include: {
        variant: {
          include: {
            product: true,
          }
        },
        material: true,
      },
    });
  }

  async findProductRecipes(variantId: string) {
    return this.prisma.productRecipe.findMany({
      where: { variant_id: variantId },
      include: {
        variant: {
          include: {
            product: true,
          }
        },
        material: true,
      },
    });
  }

  async findProductRecipesByProduct(productId: string) {
    return this.prisma.productRecipe.findMany({
      where: {
        variant: {
          product_id: productId,
        },
      },
      include: {
        variant: {
          include: {
            product: true,
          }
        },
        material: true,
      },
    });
  }

  async updateProductRecipe(id: string, dto: Partial<CreateProductRecipeDto>) {
    return this.prisma.productRecipe.update({
      where: { id },
      data: {
        variant_id: dto.variant_id,
        material_id: dto.material_id,
        quantity: dto.quantity,
      },
      include: {
        variant: {
          include: {
            product: true,
          }
        },
        material: true,
      },
    });
  }

  async deleteProductRecipe(id: string) {
    return this.prisma.productRecipe.delete({ where: { id } });
  }

  // ============== Topping Recipes ==============
  async createToppingRecipe(dto: CreateToppingRecipeDto) {
    return this.prisma.toppingRecipe.create({
      data: {
        topping_id: dto.topping_id,
        material_id: dto.material_id,
        quantity: dto.quantity,
      },
      include: {
        topping: true,
        material: true,
      },
    });
  }

  async findToppingRecipes(toppingId: string) {
    return this.prisma.toppingRecipe.findMany({
      where: { topping_id: toppingId },
      include: {
        topping: true,
        material: true,
      },
    });
  }

  async updateToppingRecipe(id: string, dto: Partial<CreateToppingRecipeDto>) {
    return this.prisma.toppingRecipe.update({
      where: { id },
      data: {
        topping_id: dto.topping_id,
        material_id: dto.material_id,
        quantity: dto.quantity,
      },
      include: {
        topping: true,
        material: true,
      },
    });
  }

  async deleteToppingRecipe(id: string) {
    return this.prisma.toppingRecipe.delete({ where: { id } });
  }

  // ============== Cost Analysis ==============
  async getProductCost(variantId: string) {
    const recipes = await this.prisma.productRecipe.findMany({
      where: { variant_id: variantId },
      include: {
        material: true,
        variant: {
          include: {
            product: true
          }
        }
      },
    });

    if (recipes.length === 0) {
      // If no recipe, maybe at least find the product to return 0 cost
      const variant = await this.prisma.productVariant.findUnique({
        where: { id: variantId },
        include: { product: true }
      });
      if (!variant) throw new NotFoundException('Sản phẩm không tồn tại');
      
      return {
        product_id: variant.product.id,
        product_name: variant.product.name_vi,
        variant_id: variant.id,
        variant_size: variant.size,
        total_cost: 0,
        materials: [],
      };
    }

    const first = recipes[0];
    const materials = recipes.map((r) => ({
      material_id: r.material_id,
      material_name: r.material.name,
      unit: r.material.unit,
      quantity: r.quantity,
      cost_per_unit: r.material.cost_per_unit,
      total_cost: r.quantity * r.material.cost_per_unit,
    }));

    const totalCost = materials.reduce((sum, m) => sum + m.total_cost, 0);

    return {
      product_id: first.variant.product.id,
      product_name: first.variant.product.name_vi,
      variant_id: first.variant.id,
      variant_size: first.variant.size,
      total_cost: totalCost,
      materials,
    };
  }

  async getToppingCost(toppingId: string) {
    const recipes = await this.prisma.toppingRecipe.findMany({
      where: { topping_id: toppingId },
      include: {
        material: true,
        topping: true,
      },
    });

    if (recipes.length === 0) {
      const topping = await this.prisma.topping.findUnique({ where: { id: toppingId } });
      if (!topping) throw new NotFoundException('Topping không tồn tại');
      return {
        topping_id: topping.id,
        topping_name: topping.name,
        total_cost: 0,
        materials: [],
      };
    }

    const first = recipes[0];
    const materials = recipes.map((r) => ({
      material_id: r.material_id,
      material_name: r.material.name,
      unit: r.material.unit,
      quantity: r.quantity,
      cost_per_unit: r.material.cost_per_unit,
      total_cost: r.quantity * r.material.cost_per_unit,
    }));

    const totalCost = materials.reduce((sum, m) => sum + m.total_cost, 0);

    return {
      topping_id: first.topping.id,
      topping_name: first.topping.name,
      total_cost: totalCost,
      materials,
    };
  }

  // --- IMPORT / EXPORT METHODS ---

  async generateTemplate(): Promise<Buffer> {
    const wb = XLSX.utils.book_new();

    // Sheet 1: Product Recipes
    const prodData = [
      ['Tên món', 'Size', 'Tên nguyên liệu', 'Số lượng sử dụng'],
      ['Cafe sữa đá', 'M', 'Cà phê hạt', 50],
      ['Cafe sữa đá', 'M', 'Sữa đặc', 1],
      ['Trà đào', 'L', 'Trà ô long', 15],
    ];
    const wsProd = XLSX.utils.aoa_to_sheet(prodData);
    XLSX.utils.book_append_sheet(wb, wsProd, 'Món chính');

    // Sheet 2: Topping Recipes
    const topData = [
      ['Tên topping', 'Tên nguyên liệu', 'Số lượng sử dụng'],
      ['Trân châu trắng', 'Bột năng', 30],
      ['Thạch đào', 'Bột thạch', 10],
    ];
    const wsTop = XLSX.utils.aoa_to_sheet(topData);
    XLSX.utils.book_append_sheet(wb, wsTop, 'Toppings');

    // Sheet 3: Guide
    const guideData = [
      ['Tên sheet', 'Cột', 'Mô tả', 'Lưu ý'],
      ['Món chính', 'Tên món', 'Tên trong hệ thống (phải khớp 100%)', 'Tên tiếng Việt'],
      ['Món chính', 'Size', 'S, M, L... (phải khớp)', 'Viết hoa'],
      ['Món chính', 'Tên nguyên liệu', 'Tên trong Vật tư (phải khớp)', ''],
      ['Món chính', 'Số lượng', 'Lượng trừ kho khi bán 1 món', 'Số'],
      ['Toppings', 'Tên topping', 'Tên trong hệ thống (phải khớp)', ''],
    ];
    const wsGuide = XLSX.utils.aoa_to_sheet(guideData);
    XLSX.utils.book_append_sheet(wb, wsGuide, 'Hướng dẫn');

    return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  }

  async importRecipes(buffer: Buffer): Promise<any> {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    
    // Process Products
    const prodSheet = workbook.Sheets['Món chính'];
    const toppingSheet = workbook.Sheets['Toppings'];
    
    const results = { products: 0, toppings: 0, errors: [] as string[] };

    if (prodSheet) {
      const data: any[] = XLSX.utils.sheet_to_json(prodSheet);
      for (const row of data) {
        const prodName = row['Tên món'];
        const size = row['Size'];
        const matName = row['Tên nguyên liệu'];
        const qty = parseFloat(row['Số lượng sử dụng']);

        if (!prodName || !size || !matName || isNaN(qty)) continue;

        try {
          const variant = await this.prisma.productVariant.findFirst({
            where: { size, product: { name_vi: prodName } }
          });
          const material = await this.prisma.material.findFirst({ where: { name: matName } });

          if (!variant) throw new Error(`Không tìm thấy món "${prodName}" size ${size}`);
          if (!material) throw new Error(`Không tìm thấy nguyên liệu "${matName}"`);

          const existingRecipe = await this.prisma.productRecipe.findFirst({ where: { variant_id: variant.id, material_id: material.id } });

          await this.prisma.productRecipe.upsert({
            where: { id: existingRecipe?.id || 'none' },
            update: { quantity: qty },
            create: { variant_id: variant.id, material_id: material.id, quantity: qty }
          });
          results.products++;
        } catch (err) {
          results.errors.push(`Món chính - ${prodName}: ${err.message}`);
        }
      }
    }

    if (toppingSheet) {
      const data: any[] = XLSX.utils.sheet_to_json(toppingSheet);
      for (const row of data) {
        const topName = row['Tên topping'];
        const matName = row['Tên nguyên liệu'];
        const qty = parseFloat(row['Số lượng sử dụng']);

        if (!topName || !matName || isNaN(qty)) continue;

        try {
          const topping = await this.prisma.topping.findFirst({ where: { name: topName } });
          const material = await this.prisma.material.findFirst({ where: { name: matName } });

          if (!topping) throw new Error(`Không tìm thấy topping "${topName}"`);
          if (!material) throw new Error(`Không tìm thấy nguyên liệu "${matName}"`);

          const existingRecipe = await this.prisma.toppingRecipe.findFirst({ where: { topping_id: topping.id, material_id: material.id } });

          await this.prisma.toppingRecipe.upsert({
            where: { id: existingRecipe?.id || 'none' },
            update: { quantity: qty },
            create: { topping_id: topping.id, material_id: material.id, quantity: qty }
          });
          results.toppings++;
        } catch (err) {
          results.errors.push(`Toppings - ${topName}: ${err.message}`);
        }
      }
    }

    return results;
  }

  async exportRecipes(): Promise<Buffer> {
    const prodRecipes = await this.prisma.productRecipe.findMany({
      include: { variant: { include: { product: true } }, material: true }
    });
    const topRecipes = await this.prisma.toppingRecipe.findMany({
      include: { topping: true, material: true }
    });

    const wb = XLSX.utils.book_new();

    const pData = prodRecipes.map(r => ({
      'Tên món': r.variant.product.name_vi,
      'Size': r.variant.size,
      'Tên nguyên liệu': r.material.name,
      'Số lượng sử dụng': r.quantity
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(pData), 'Món chính');

    const tData = topRecipes.map(r => ({
      'Tên topping': r.topping.name,
      'Tên nguyên liệu': r.material.name,
      'Số lượng sử dụng': r.quantity
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(tData), 'Toppings');

    return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  }
}
