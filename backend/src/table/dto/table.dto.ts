import { IsString, IsOptional } from 'class-validator';

export class CreateTableDto {
  @IsString()
  name: string; // Bàn 1, Bàn 2, etc.
}

export class UpdateTableDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  status?: 'AVAILABLE' | 'OCCUPIED'; // AVAILABLE, OCCUPIED
}

export class TableResponseDto {
  id: string;
  name: string;
  status: 'AVAILABLE' | 'OCCUPIED';
  current_order?: {
    id: string;
    order_number: string;
    order_type: string;
  };
}
