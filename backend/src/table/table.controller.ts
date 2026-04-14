import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TableService } from './table.service';
import {
  CreateTableDto,
  UpdateTableDto,
  TransferTableDto,
} from './dto/table.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tables')
export class TableController {
  constructor(private tableService: TableService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTable(@Body() dto: CreateTableDto, @Request() req) {
    const payload = { ...dto };
    if (req.user.role !== 'ADMIN') {
      payload.branch_id = req.user.branch_id;
    }
    return this.tableService.createTable(payload);
  }

  @Get()
  async getAllTables(@Request() req, @Query('branch_id') branchId?: string) {
    const bId = req.user.role === 'ADMIN' ? branchId : req.user.branch_id;
    return this.tableService.getAllTables(bId);
  }

  @Get('available')
  async getAvailableTables(
    @Request() req,
    @Query('branch_id') branchId?: string,
  ) {
    const bId = req.user.role === 'ADMIN' ? branchId : req.user.branch_id;
    return this.tableService.getAvailableTables(bId);
  }

  @Get('occupancy-status')
  async getOccupancyStatus(
    @Request() req,
    @Query('branch_id') branchId?: string,
  ) {
    const bId = req.user.role === 'ADMIN' ? branchId : req.user.branch_id;
    return this.tableService.getTableOccupancyStatus(bId);
  }

  @Get(':id')
  async getTableById(@Param('id') id: string) {
    return this.tableService.getTableById(id);
  }

  @Put(':id')
  async updateTable(@Param('id') id: string, @Body() dto: UpdateTableDto) {
    return this.tableService.updateTable(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTable(@Param('id') id: string) {
    return this.tableService.deleteTable(id);
  }

  @Post(':id/occupy')
  @HttpCode(HttpStatus.OK)
  async occupyTable(@Param('id') id: string) {
    return this.tableService.occupyTable(id);
  }

  @Post(':id/release')
  @HttpCode(HttpStatus.OK)
  async releaseTable(@Param('id') id: string) {
    return this.tableService.releaseTable(id);
  }

  @Post(':id/transfer')
  @HttpCode(HttpStatus.OK)
  async transferTable(@Param('id') id: string, @Body() dto: TransferTableDto) {
    return this.tableService.transferTable(id, dto.to_table_id);
  }
}
