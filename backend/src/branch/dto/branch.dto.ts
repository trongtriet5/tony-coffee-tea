import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBranchDto {
  @ApiProperty({ example: 'Tony Coffee - Chi nhánh 1', description: 'Tên chi nhánh' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: '123 Nguyễn Văn Cừ, Q.5, TP.HCM', description: 'Địa chỉ chi nhánh' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: '0901234567', description: 'Số điện thoại chi nhánh' })
  @IsString()
  @IsOptional()
  phone?: string;
}

export class UpdateBranchDto {
  @ApiPropertyOptional({ example: 'Tony Coffee - Chi nhánh 2', description: 'Tên chi nhánh' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: '456 Lê Văn Việt, Q.9, TP.HCM', description: 'Địa chỉ chi nhánh' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: '0907654321', description: 'Số điện thoại chi nhánh' })
  @IsString()
  @IsOptional()
  phone?: string;
}
