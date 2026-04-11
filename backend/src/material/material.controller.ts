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
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Res,
  ForbiddenException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { MaterialService } from './material.service';
import { CreateMaterialDto, UpdateMaterialDto, MaterialTransactionDto } from './dto/material.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('materials')
export class MaterialController {
  constructor(private materialService: MaterialService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createMaterial(@Body() dto: CreateMaterialDto, @Request() req) {
    const payload = { ...dto };
    if (req.user.role !== 'ADMIN') {
      payload.branch_id = req.user.branch_id;
    }
    return this.materialService.createMaterial(payload);
  }

  @Get()
  async getAllMaterials(@Request() req, @Query('branch_id') branch_id?: string) {
    const bId = req.user.role === 'ADMIN' ? branch_id : req.user.branch_id;
    return this.materialService.getAllMaterials(bId);
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

  @Get('export/excel')
  async exportExcel(@Res() res: Response, @Request() req, @Query('branch_id') branchId?: string) {
    const bId = req.user.role === 'ADMIN' ? branchId : req.user.branch_id;
    const buffer = await this.materialService.exportMaterials(bId);
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="inventory.xlsx"',
    });
    res.send(buffer);
  }

  @Get('export/template')
  async exportTemplate(@Res() res: Response) {
    const buffer = await this.materialService.generateTemplate();
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="material_template.xlsx"',
    });
    res.send(buffer);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importMaterials(@UploadedFile() file: any, @Request() req) {
    if (req.user.role !== 'ADMIN') throw new ForbiddenException('Only admin can import');
    return this.materialService.importMaterials(file.buffer, req.user.branch_id);
  }
}
