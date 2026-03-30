import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name_vi: string;

  @ApiProperty()
  @IsString()
  name_en: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  available?: boolean;
}

export class CreateToppingDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  available?: boolean;
}
