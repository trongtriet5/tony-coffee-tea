import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsOptional, IsEnum } from 'class-validator';

export class CreateVoucherDto {
  @ApiProperty({ example: 'E001', description: 'Employee ID from internal app' })
  @IsString()
  employee_id: string;

  @ApiProperty({ example: 100000, description: 'Voucher amount in VND' })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ example: 'internal', description: 'Voucher type', default: 'internal' })
  @IsString()
  @IsOptional()
  voucher_type?: string;
}

export class ApplyVoucherDto {
  @ApiProperty({ example: 'IPOS-XXXX-YYYY', description: 'Voucher code to apply' })
  @IsString()
  voucher_code: string;
}

export class VoucherResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  voucher_code: string;

  @ApiProperty()
  employee_id: string;

  @ApiProperty()
  amount: number;

  @ApiProperty({ enum: ['UNUSED', 'USED', 'EXPIRED'] })
  status: string;

  @ApiProperty()
  voucher_type: string;

  @ApiProperty()
  expires_at: Date;

  @ApiProperty()
  created_at: Date;

  @ApiProperty({ nullable: true })
  used_at: Date | null;
}
