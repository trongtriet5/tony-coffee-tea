import { Controller, Post, Get, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/voucher.dto';

@ApiTags('vouchers')
@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new voucher' })
  async create(@Body() dto: CreateVoucherDto) {
    return this.voucherService.create(dto);
  }

  @Get('status/:voucher_code')
  @ApiOperation({ summary: 'Get voucher status' })
  async getStatus(@Param('voucher_code') voucherCode: string) {
    return this.voucherService.getStatus(voucherCode);
  }

  @Get('validate/:voucher_code')
  @ApiOperation({ summary: 'Validate voucher for POS' })
  async validate(@Param('voucher_code') voucherCode: string) {
    return this.voucherService.validate(voucherCode);
  }

  @Get()
  @ApiOperation({ summary: 'List vouchers' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.voucherService.findAll({ page, limit });
  }

  @Get('stats')
  @ApiOperation({ summary: 'Voucher stats' })
  async getStats() {
    return this.voucherService.getStats();
  }
}
