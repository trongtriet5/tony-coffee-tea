import { IsString, IsArray, IsNumber, IsOptional, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({ example: 'prod_abc123', description: 'ID sản phẩm' })
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @ApiPropertyOptional({ example: 'var_m', description: 'ID biến thể (size)' })
  @IsString()
  @IsOptional()
  variant_id?: string;

  @ApiProperty({ example: 2, description: 'Số lượng' })
  @IsNumber()
  quantity: number;

  @ApiPropertyOptional({ type: [String], example: ['top_abc'], description: 'Danh sách ID topping' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  topping_ids?: string[];

  @ApiPropertyOptional({ example: 'Ít đường', description: 'Ghi chú cho món' })
  @IsString()
  @IsOptional()
  note?: string;
}

export class CreateOrderDto {
  @ApiProperty({ type: [CreateOrderItemDto], description: 'Danh sách món trong đơn hàng' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @ApiProperty({ example: 'branch_cn1', description: 'ID chi nhánh' })
  @IsString()
  @IsNotEmpty()
  branch_id: string;

  @ApiProperty({ example: 'CASH', description: 'Phương thức thanh toán: CASH, CARD, TRANSFER' })
  @IsString()
  @IsNotEmpty()
  payment_method: string;

  @ApiPropertyOptional({ example: 'TAKEAWAY', description: 'Loại đơn: TAKEAWAY | DINE_IN' })
  @IsString()
  @IsOptional()
  order_type?: string;

  @ApiPropertyOptional({ example: 'POS', description: 'Nguồn đơn: POS, GRAB, SHOPEE, WEB' })
  @IsString()
  @IsOptional()
  source?: string;

  @ApiPropertyOptional({ example: 'table_01', description: 'ID bàn (bắt buộc nếu DINE_IN)' })
  @IsString()
  @IsOptional()
  table_id?: string;

  @ApiPropertyOptional({ example: 'emp_01', description: 'ID thu ngân' })
  @IsString()
  @IsOptional()
  cashier_id?: string;

  @ApiPropertyOptional({ example: 'Khách VIP', description: 'Ghi chú đơn hàng' })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiPropertyOptional({ example: 10000, description: 'Số tiền giảm giá (VND)' })
  @IsNumber()
  @IsOptional()
  discount_amount?: number;
}
