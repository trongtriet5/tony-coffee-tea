import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  name: string;

  @IsString()
  branch_id: string; // Required for multi-branch

  @IsString()
  unit: string; // g, ml, cái, kg, lít, etc.

  @IsNumber()
  cost_per_unit: number;

  @IsOptional()
  @IsNumber()
  initial_stock?: number;
}

export class UpdateMaterialDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsNumber()
  cost_per_unit?: number;

  @IsOptional()
  @IsNumber()
  stock_current?: number; // Added for manual update fix
}

export class MaterialTransactionDto {
  @IsString()
  material_id: string;

  @IsString()
  type: 'IN' | 'OUT' | 'ADJUST' | 'USED'; // IN: mua vào, OUT: bán ra, ADJUST: điều chỉnh, USED: sử dụng trong order

  @IsNumber()
  quantity: number;

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
  stock_value: number; // cost_per_unit * stock_current
  created_at: Date;
}
