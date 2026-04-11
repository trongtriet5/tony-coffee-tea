import { IsString, IsNumber } from 'class-validator';

export class CreateProductRecipeDto {
  @IsString()
  variant_id: string;

  @IsString()
  material_id: string;

  @IsNumber()
  quantity: number; // Quantity of material needed per variant
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
  variant_id: string;
  variant_size: string;
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
