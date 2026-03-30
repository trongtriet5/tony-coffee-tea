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
} from '@nestjs/common';
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
    return this.recipeService.getProductRecipesByProduct(productId);
  }

  @Get('products/:productId/complete')
  async getCompleteProductRecipe(@Param('productId') productId: string) {
    return this.recipeService.getCompleteProductRecipe(productId);
  }

  @Put('products/:id')
  async updateProductRecipe(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.recipeService.updateProductRecipe(id, quantity);
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
    return this.recipeService.getToppingRecipesByTopping(toppingId);
  }

  @Put('toppings/:id')
  async updateToppingRecipe(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.recipeService.updateToppingRecipe(id, quantity);
  }

  @Delete('toppings/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteToppingRecipe(@Param('id') id: string) {
    return this.recipeService.deleteToppingRecipe(id);
  }
}
