import { IsString, IsNumber } from 'class-validator';

export class CreateProductRecipeDto {
  @IsString()
  product_id: string;

  @IsString()
  material_id: string;

  @IsNumber()
  quantity: number; // Quantity of material needed per product
}

export class CreateToppingRecipeDto {
  @IsString()
  topping_id: string;

  @IsString()
  material_id: string;

  @IsNumber()
  quantity: number;
}

export class ProductRecipeResponseDto {
  id: string;
  product_id: string;
  product_name: string;
  material_id: string;
  material_name: string;
  material_unit: string;
  quantity: number;
}

export class ToppingRecipeResponseDto {
  id: string;
  topping_id: string;
  topping_name: string;
  material_id: string;
  material_name: string;
  material_unit: string;
  quantity: number;
}
