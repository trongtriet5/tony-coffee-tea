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
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto, UpdateTableDto } from './dto/table.dto';

@Controller('tables')
export class TableController {
  constructor(private tableService: TableService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTable(@Body() dto: CreateTableDto) {
    return this.tableService.createTable(dto);
  }

  @Get()
  async getAllTables() {
    return this.tableService.getAllTables();
  }

  @Get('available')
  async getAvailableTables() {
    return this.tableService.getAvailableTables();
  }

  @Get('occupancy-status')
  async getOccupancyStatus() {
    return this.tableService.getTableOccupancyStatus();
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
}
