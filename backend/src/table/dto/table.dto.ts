import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTableDto {
  @ApiProperty({ example: 'Bàn 1', description: 'Tên bàn' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'branch_cn1', description: 'ID chi nhánh' })
  @IsOptional()
  @IsString()
  branch_id?: string;

  @ApiPropertyOptional({ example: 'Khu VIP', description: 'Khu vực bàn' })
  @IsOptional()
  @IsString()
  area?: string;
}

export class TransferTableDto {
  @ApiProperty({
    example: 'table_02',
    description: 'ID bàn đích cần chuyển tới',
  })
  @IsString()
  to_table_id: string;
}

export class UpdateTableDto {
  @ApiPropertyOptional({ example: 'Bàn VIP 1', description: 'Tên bàn' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    enum: ['AVAILABLE', 'OCCUPIED'],
    example: 'AVAILABLE',
    description: 'Trạng thái bàn',
  })
  @IsOptional()
  @IsString()
  status?: 'AVAILABLE' | 'OCCUPIED';

  @ApiPropertyOptional({ example: 'branch_cn1', description: 'ID chi nhánh' })
  @IsOptional()
  @IsString()
  branch_id?: string;

  @ApiPropertyOptional({ example: 'Tầng 2', description: 'Khu vực bàn' })
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
