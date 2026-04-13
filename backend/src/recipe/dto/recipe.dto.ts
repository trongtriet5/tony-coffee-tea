import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductRecipeDto {
  @ApiProperty({ example: 'var_size_m', description: 'ID biến thể sản phẩm (size)' })
  @IsString()
  variant_id: string;

  @ApiProperty({ example: 'mat_cafe_01', description: 'ID nguyên liệu' })
  @IsString()
  material_id: string;

  @ApiProperty({ example: 15, description: 'Số lượng nguyên liệu cần dùng mỗi phần' })
  @IsNumber()
  quantity: number;
}

export class CreateToppingRecipeDto {
  @ApiProperty({ example: 'top_sy_dau', description: 'ID topping' })
  @IsString()
  topping_id: string;

  @ApiProperty({ example: 'mat_siro_01', description: 'ID nguyên liệu' })
  @IsString()
  material_id: string;

  @ApiProperty({ example: 5, description: 'Số lượng nguyên liệu cần dùng mỗi topping' })
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
