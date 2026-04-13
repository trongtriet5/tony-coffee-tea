import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { RecipeService } from './recipe.service';
import { CreateProductRecipeDto, CreateToppingRecipeDto } from './dto/recipe.dto';

@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  // Product Recipes
  @Post('products')
  @HttpCode(HttpStatus.CREATED)
  async createProductRecipe(@Body() dto: CreateProductRecipeDto) {
    return this.recipeService.createProductRecipe(dto);
  }

  @Get('products/:productId')
  async getProductRecipes(@Param('productId') productId: string) {
    return this.recipeService.findProductRecipesByProduct(productId);
  }

  @Get('variants/:variantId')
  async getRecipesByVariant(@Param('variantId') variantId: string) {
    return this.recipeService.findProductRecipes(variantId);
  }

  @Get('products/:productId/complete')
  async getCompleteProductRecipe(@Param('productId') productId: string) {
    // Note: If productId is passed, we might need a way to find first variant or sum all variants.
    // Usually cost is per variant (Size).
    // For now, let's assume we want a generic cost or the first one found.
    return this.recipeService.getProductCost(productId); 
  }

  @Get('variants/:variantId/cost')
  async getVariantCost(@Param('variantId') variantId: string) {
    return this.recipeService.getProductCost(variantId);
  }

  @Put('products/:id')
  async updateProductRecipe(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.recipeService.updateProductRecipe(id, { quantity });
  }

  @Delete('products/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProductRecipe(@Param('id') id: string) {
    return this.recipeService.deleteProductRecipe(id);
  }

  // Topping Recipes
  @Post('toppings')
  @HttpCode(HttpStatus.CREATED)
  async createToppingRecipe(@Body() dto: CreateToppingRecipeDto) {
    return this.recipeService.createToppingRecipe(dto);
  }

  @Get('toppings/:toppingId')
  async getToppingRecipes(@Param('toppingId') toppingId: string) {
    return this.recipeService.findToppingRecipes(toppingId);
  }

  @Get('toppings/:toppingId/cost')
  async getToppingCost(@Param('toppingId') toppingId: string) {
    return this.recipeService.getToppingCost(toppingId);
  }

  @Put('toppings/:id')
  async updateToppingRecipe(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.recipeService.updateToppingRecipe(id, { quantity });
  }

  @Delete('toppings/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteToppingRecipe(@Param('id') id: string) {
    return this.recipeService.deleteToppingRecipe(id);
  }

  // --- IMPORT / EXPORT ---
  @Get('export/excel')
  async exportExcel(@Res() res: Response) {
    const buffer = await this.recipeService.exportRecipes();
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="recipes.xlsx"',
    });
    res.send(buffer);
  }

  @Get('export/template')
  async exportTemplate(@Res() res: Response) {
    const buffer = await this.recipeService.generateTemplate();
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="recipe_template.xlsx"',
    });
    res.send(buffer);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importRecipes(@UploadedFile() file: any) {
    return this.recipeService.importRecipes(file.buffer);
  }
}
