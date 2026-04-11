import { IsString, IsOptional } from 'class-validator';

export class CreateTableDto {
  @IsString()
  name: string; // Bàn 1, Bàn 2, etc.

  @IsOptional()
  @IsString()
  branch_id?: string;

  @IsOptional()
  @IsString()
  area?: string;
}

export class UpdateTableDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  status?: 'AVAILABLE' | 'OCCUPIED'; // AVAILABLE, OCCUPIED

  @IsOptional()
  @IsString()
  branch_id?: string;

  @IsOptional()
  @IsString()
  area?: string;
}

export class TableResponseDto {
  id: string;
  name: string;
  status: 'AVAILABLE' | 'OCCUPIED';
  branch_id?: string;
  area?: string;
  current_order?: {
    id: string;
    order_number: string;
    order_type: string;
  };
}
