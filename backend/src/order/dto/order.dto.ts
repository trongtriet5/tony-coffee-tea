import { IsString, IsArray, IsNumber, IsOptional, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsNumber()
  quantity: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  topping_ids?: string[];

  @IsString()
  @IsOptional()
  note?: string;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  voucher_codes?: string[];

  @IsString()
  @IsNotEmpty()
  payment_method: string;

  @IsString()
  @IsOptional()
  order_type?: string; // TAKEAWAY, DINE_IN (default: TAKEAWAY)

  @IsString()
  @IsOptional()
  table_id?: string; // Required if order_type is DINE_IN

  @IsString()
  @IsOptional()
  cashier_id?: string;

  @IsString()
  @IsOptional()
  note?: string;
}
