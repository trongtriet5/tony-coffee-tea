import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMaterialDto {
  @ApiProperty({ example: 'Cà phê Arabica', description: 'Tên nguyên liệu' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'branch_cn1', description: 'ID chi nhánh' })
  @IsString()
  branch_id: string;

  @ApiProperty({ example: 'kg', description: 'Đơn vị: g, ml, cái, kg, lít...' })
  @IsString()
  unit: string;

  @ApiProperty({ example: 150000, description: 'Giá vốn mỗi đơn vị (VND)' })
  @IsNumber()
  cost_per_unit: number;

  @ApiPropertyOptional({ example: 10, description: 'Tồn kho ban đầu' })
  @IsOptional()
  @IsNumber()
  initial_stock?: number;
}

export class UpdateMaterialDto {
  @ApiPropertyOptional({ example: 'Cà phê Robusta', description: 'Tên nguyên liệu' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'g', description: 'Đơn vị đo lường' })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional({ example: 120000, description: 'Giá vốn mỗi đơn vị (VND)' })
  @IsOptional()
  @IsNumber()
  cost_per_unit?: number;

  @ApiPropertyOptional({ example: 5.5, description: 'Tồn kho hiện tại (cập nhật thủ công)' })
  @IsOptional()
  @IsNumber()
  stock_current?: number;
}

export class MaterialTransactionDto {
  @ApiProperty({ example: 'mat_abc123', description: 'ID nguyên liệu' })
  @IsString()
  material_id: string;

  @ApiProperty({ enum: ['IN', 'OUT', 'ADJUST', 'USED'], example: 'IN', description: 'Loại giao dịch: IN=nhập, OUT=xuất, ADJUST=điều chỉnh, USED=đã dùng' })
  @IsString()
  type: 'IN' | 'OUT' | 'ADJUST' | 'USED';

  @ApiProperty({ example: 2.5, description: 'Số lượng giao dịch' })
  @IsNumber()
  quantity: number;

  @ApiPropertyOptional({ example: 'Nhập kho tháng 4', description: 'Ghi chú' })
  @IsOptional()
  @IsString()
  note?: string;
}

export class MaterialResponseDto {
  id: string;
  name: string;
  unit: string;
  cost_per_unit: number;
  stock_current: number;
  stock_value: number;
  created_at: Date;
}
