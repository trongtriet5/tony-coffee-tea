import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto, UpdateMaterialDto, MaterialTransactionDto } from './dto/material.dto';

@Controller('materials')
export class MaterialController {
  constructor(private materialService: MaterialService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createMaterial(@Body() dto: CreateMaterialDto) {
    return this.materialService.createMaterial(dto);
  }

  @Get()
  async getAllMaterials() {
    return this.materialService.getAllMaterials();
  }

  @Get(':id')
  async getMaterialById(@Param('id') id: string) {
    return this.materialService.getMaterialById(id);
  }

  @Put(':id')
  async updateMaterial(@Param('id') id: string, @Body() dto: UpdateMaterialDto) {
    return this.materialService.updateMaterial(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMaterial(@Param('id') id: string) {
    return this.materialService.deleteMaterial(id);
  }

  // Material Transactions
  @Post('transactions/add')
  @HttpCode(HttpStatus.CREATED)
  async addTransaction(@Body() dto: MaterialTransactionDto) {
    return this.materialService.addMaterialTransaction(dto);
  }

  @Get(':id/transactions')
  async getMaterialTransactions(
    @Param('id') id: string,
    @Query('limit') limit: string = '50',
  ) {
    return this.materialService.getMaterialTransactions(id, parseInt(limit));
  }

  // Reports
  @Get('reports/inventory')
  async getInventoryReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.materialService.getMaterialInventoryReport(start, end);
  }
}
