import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductRecipeDto, CreateToppingRecipeDto } from './dto/recipe.dto';
import * as XLSX from 'xlsx';

@Injectable()
export class RecipeService {
  constructor(private readonly prisma: PrismaService) {}

  // ============== Product Recipes ==============
  async createProductRecipe(dto: CreateProductRecipeDto) {
    const existing = await this.prisma.productRecipe.findFirst({
      where: { variant_id: dto.variant_id, material_id: dto.material_id }
    });

    return this.prisma.productRecipe.upsert({
      where: { id: existing?.id || 'none' },
      update: { quantity: dto.quantity },
      create: {
        variant_id: dto.variant_id,
        material_id: dto.material_id,
        quantity: dto.quantity,
      },
      include: {
        variant: { include: { product: true } },
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
    const existing = await this.prisma.toppingRecipe.findFirst({
      where: { topping_id: dto.topping_id, material_id: dto.material_id }
    });

    return this.prisma.toppingRecipe.upsert({
      where: { id: existing?.id || 'none' },
      update: { quantity: dto.quantity },
      create: {
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
      ['Món chính', 'Tên món', 'Tên trong hệ thống (phải khớp 100%)', 'Copy từ sheet "Sản phẩm & Size"'],
      ['Món chính', 'Size', 'S, M, L... (phải khớp)', 'Copy từ sheet "Sản phẩm & Size"'],
      ['Món chính', 'Tên nguyên liệu', 'Tên trong Vật tư (phải khớp)', 'Copy từ sheet "Vật tư hiện có"'],
      ['Món chính', 'Số lượng', 'Lượng trừ kho khi bán 1 món', 'Số'],
      ['Toppings', 'Tên topping', 'Tên trong hệ thống (phải khớp)', ''],
    ];
    const wsGuide = XLSX.utils.aoa_to_sheet(guideData);
    XLSX.utils.book_append_sheet(wb, wsGuide, 'Hướng dẫn');

    // Sheet 4: Reference Materials
    const materials = await this.prisma.material.findMany({ select: { name: true, unit: true }, orderBy: { name: 'asc' } });
    const wsMatData = [['Tên nguyên liệu', 'Đơn vị'], ...materials.map(m => [m.name, m.unit])];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(wsMatData), 'Vật tư hiện có');

    // Sheet 5: Reference Products
    const products = await this.prisma.product.findMany({ include: { variants: true }, orderBy: { name_vi: 'asc' } });
    const wsProdRefData = [['Tên món', 'Size / Phân loại'], ...products.flatMap(p => p.variants.map(v => [p.name_vi, v.size]))];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(wsProdRefData), 'Sản phẩm & Size');

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
        const prodNameInput = row['Tên món']?.toString().trim();
        const sizeInput = row['Size']?.toString().trim();
        const matNameInput = row['Tên nguyên liệu']?.toString().trim();
        const qty = parseFloat(row['Số lượng sử dụng']);

        if (!prodNameInput || !sizeInput || !matNameInput || isNaN(qty)) continue;

        try {
          const variant = await this.prisma.productVariant.findFirst({
            where: { 
              size: { equals: sizeInput }, 
              product: { 
                OR: [
                  { name_vi: { equals: prodNameInput } },
                  { name_en: { equals: prodNameInput } }
                ]
              } 
            }
          });
          
          const material = await this.prisma.material.findFirst({ 
            where: { name: { equals: matNameInput } } 
          });

          if (!variant) throw new Error(`Không tìm thấy món "${prodNameInput}" size ${sizeInput}`);
          if (!material) throw new Error(`Không tìm thấy nguyên liệu "${matNameInput}"`);

          const existingRecipe = await this.prisma.productRecipe.findFirst({ where: { variant_id: variant.id, material_id: material.id } });

          await this.prisma.productRecipe.upsert({
            where: { id: existingRecipe?.id || 'none' },
            update: { quantity: qty },
            create: { variant_id: variant.id, material_id: material.id, quantity: qty }
          });
          results.products++;
        } catch (err) {
          results.errors.push(`Món chính - ${prodNameInput}: ${err.message}`);
        }
      }
    }

    if (toppingSheet) {
      const data: any[] = XLSX.utils.sheet_to_json(toppingSheet);
      for (const row of data) {
        const topNameInput = row['Tên topping']?.toString().trim();
        const matNameInput = row['Tên nguyên liệu']?.toString().trim();
        const qty = parseFloat(row['Số lượng sử dụng']);

        if (!topNameInput || !matNameInput || isNaN(qty)) continue;

        try {
          const topping = await this.prisma.topping.findFirst({ 
            where: { name: { equals: topNameInput } } 
          });
          const material = await this.prisma.material.findFirst({ 
            where: { name: { equals: matNameInput } } 
          });

          if (!topping) throw new Error(`Không tìm thấy topping "${topNameInput}"`);
          if (!material) throw new Error(`Không tìm thấy nguyên liệu "${matNameInput}"`);

          const existingRecipe = await this.prisma.toppingRecipe.findFirst({ where: { topping_id: topping.id, material_id: material.id } });

          await this.prisma.toppingRecipe.upsert({
            where: { id: existingRecipe?.id || 'none' },
            update: { quantity: qty },
            create: { topping_id: topping.id, material_id: material.id, quantity: qty }
          });
          results.toppings++;
        } catch (err) {
          results.errors.push(`Toppings - ${topNameInput}: ${err.message}`);
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
