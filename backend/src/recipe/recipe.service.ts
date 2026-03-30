import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateProductRecipeDto,
  CreateToppingRecipeDto,
  ProductRecipeResponseDto,
  ToppingRecipeResponseDto,
} from './dto/recipe.dto';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  // Product Recipe Management
  async createProductRecipe(dto: CreateProductRecipeDto): Promise<ProductRecipeResponseDto> {
    // Verify product and material exist
    const [product, material] = await Promise.all([
      this.prisma.product.findUnique({ where: { id: dto.product_id } }),
      this.prisma.material.findUnique({ where: { id: dto.material_id } }),
    ]);

    if (!product) throw new NotFoundException(`Product with id ${dto.product_id} not found`);
    if (!material) throw new NotFoundException(`Material with id ${dto.material_id} not found`);

    // Check if recipe already exists
    const existing = await this.prisma.productRecipe.findFirst({
      where: {
        product_id: dto.product_id,
        material_id: dto.material_id,
      },
    });

    if (existing) {
      throw new BadRequestException(
        `Recipe for product and material already exists. Use update instead.`,
      );
    }

    const recipe = await this.prisma.productRecipe.create({
      data: {
        product_id: dto.product_id,
        material_id: dto.material_id,
        quantity: dto.quantity,
      },
      include: {
        product: true,
        material: true,
      },
    });

    return this.formatProductRecipeResponse(recipe);
  }

  async getProductRecipesByProduct(productId: string): Promise<ProductRecipeResponseDto[]> {
    const recipes = await this.prisma.productRecipe.findMany({
      where: { product_id: productId },
      include: {
        product: true,
        material: true,
      },
    });

    return recipes.map((r) => this.formatProductRecipeResponse(r));
  }

  async updateProductRecipe(
    id: string,
    quantity: number,
  ): Promise<ProductRecipeResponseDto> {
    const recipe = await this.prisma.productRecipe.update({
      where: { id },
      data: { quantity },
      include: {
        product: true,
        material: true,
      },
    });

    return this.formatProductRecipeResponse(recipe);
  }

  async deleteProductRecipe(id: string): Promise<void> {
    await this.prisma.productRecipe.delete({ where: { id } });
  }

  // Topping Recipe Management
  async createToppingRecipe(dto: CreateToppingRecipeDto): Promise<ToppingRecipeResponseDto> {
    // Verify topping and material exist
    const [topping, material] = await Promise.all([
      this.prisma.topping.findUnique({ where: { id: dto.topping_id } }),
      this.prisma.material.findUnique({ where: { id: dto.material_id } }),
    ]);

    if (!topping) throw new NotFoundException(`Topping with id ${dto.topping_id} not found`);
    if (!material) throw new NotFoundException(`Material with id ${dto.material_id} not found`);

    // Check if recipe already exists
    const existing = await this.prisma.toppingRecipe.findFirst({
      where: {
        topping_id: dto.topping_id,
        material_id: dto.material_id,
      },
    });

    if (existing) {
      throw new BadRequestException(
        `Recipe for topping and material already exists. Use update instead.`,
      );
    }

    const recipe = await this.prisma.toppingRecipe.create({
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

    return this.formatToppingRecipeResponse(recipe);
  }

  async getToppingRecipesByTopping(toppingId: string): Promise<ToppingRecipeResponseDto[]> {
    const recipes = await this.prisma.toppingRecipe.findMany({
      where: { topping_id: toppingId },
      include: {
        topping: true,
        material: true,
      },
    });

    return recipes.map((r) => this.formatToppingRecipeResponse(r));
  }

  async updateToppingRecipe(id: string, quantity: number): Promise<ToppingRecipeResponseDto> {
    const recipe = await this.prisma.toppingRecipe.update({
      where: { id },
      data: { quantity },
      include: {
        topping: true,
        material: true,
      },
    });

    return this.formatToppingRecipeResponse(recipe);
  }

  async deleteToppingRecipe(id: string): Promise<void> {
    await this.prisma.toppingRecipe.delete({ where: { id } });
  }

  // Get all recipes for a product including toppings
  async getCompleteProductRecipe(productId: string): Promise<any> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    const recipes = await this.prisma.productRecipe.findMany({
      where: { product_id: productId },
      include: { material: true },
    });

    return {
      product: {
        id: product.id,
        name_vi: product.name_vi,
        name_en: product.name_en,
        price: product.price,
      },
      materials: recipes.map((r) => ({
        id: r.id,
        material_id: r.material_id,
        material_name: r.material.name,
        unit: r.material.unit,
        quantity_needed: r.quantity,
        cost_per_unit: r.material.cost_per_unit,
        total_cost: r.quantity * r.material.cost_per_unit,
      })),
    };
  }

  private formatProductRecipeResponse(recipe: any): ProductRecipeResponseDto {
    return {
      id: recipe.id,
      product_id: recipe.product_id,
      product_name: recipe.product.name_vi,
      material_id: recipe.material_id,
      material_name: recipe.material.name,
      material_unit: recipe.material.unit,
      quantity: recipe.quantity,
    };
  }

  private formatToppingRecipeResponse(recipe: any): ToppingRecipeResponseDto {
    return {
      id: recipe.id,
      topping_id: recipe.topping_id,
      topping_name: recipe.topping.name,
      material_id: recipe.material_id,
      material_name: recipe.material.name,
      material_unit: recipe.material.unit,
      quantity: recipe.quantity,
    };
  }
}
