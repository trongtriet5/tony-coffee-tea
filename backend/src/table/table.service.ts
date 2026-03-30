import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTableDto, UpdateTableDto, TableResponseDto } from './dto/table.dto';

@Injectable()
export class TableService {
  constructor(private prisma: PrismaService) {}

  async createTable(dto: CreateTableDto): Promise<TableResponseDto> {
    // Check if table name already exists
    const existing = await this.prisma.table.findUnique({
      where: { name: dto.name },
    });

    if (existing) {
      throw new BadRequestException(`Table with name "${dto.name}" already exists`);
    }

    const table = await this.prisma.table.create({
      data: {
        name: dto.name,
        status: 'AVAILABLE',
      },
    });

    return this.formatTableResponse(table);
  }

  async getAllTables(): Promise<TableResponseDto[]> {
    const tables = await this.prisma.table.findMany({
      include: {
        orders: {
          where: {
            status: 'PENDING', // Only show current/pending orders
          },
          take: 1,
          orderBy: { created_at: 'desc' },
        },
      },
      orderBy: { name: 'asc' },
    });

    return tables.map((t) => this.formatTableResponse(t));
  }

  async getTableById(id: string): Promise<TableResponseDto> {
    const table = await this.prisma.table.findUnique({
      where: { id },
      include: {
        orders: {
          orderBy: { created_at: 'desc' },
          take: 5, // Last 5 orders
        },
      },
    });

    if (!table) {
      throw new NotFoundException(`Table with id ${id} not found`);
    }

    return this.formatTableResponse(table);
  }

  async updateTable(id: string, dto: UpdateTableDto): Promise<TableResponseDto> {
    const table = await this.prisma.table.findUnique({
      where: { id },
    });

    if (!table) {
      throw new NotFoundException(`Table with id ${id} not found`);
    }

    // If updating name, check uniqueness
    if (dto.name && dto.name !== table.name) {
      const existing = await this.prisma.table.findUnique({
        where: { name: dto.name },
      });
      if (existing) {
        throw new BadRequestException(`Table with name "${dto.name}" already exists`);
      }
    }

    const updated = await this.prisma.table.update({
      where: { id },
      data: dto,
    });

    return this.formatTableResponse(updated);
  }

  async deleteTable(id: string): Promise<void> {
    const table = await this.prisma.table.findUnique({
      where: { id },
      include: {
        orders: {
          take: 1,
        },
      },
    });

    if (!table) {
      throw new NotFoundException(`Table with id ${id} not found`);
    }

    if (table.orders.length > 0) {
      throw new BadRequestException('Cannot delete table with existing orders');
    }

    await this.prisma.table.delete({
      where: { id },
    });
  }

  async releaseTable(id: string): Promise<TableResponseDto> {
    const table = await this.prisma.table.findUnique({
      where: { id },
      include: { 
        orders: { 
          where: { status: 'PENDING' },
          take: 1
        } 
      }
    });

    if (!table) {
      throw new NotFoundException(`Table with id ${id} not found`);
    }

    // Mark any pending order as COMPLETED (or whichever status indicates finished)
    // Here we use 'COMPLETED' to match the default status and logic elsewhere
    if (table.orders.length > 0) {
      await this.prisma.order.update({
        where: { id: table.orders[0].id },
        data: { status: 'COMPLETED' }
      });
    }

    const updated = await this.prisma.table.update({
      where: { id },
      data: { status: 'AVAILABLE' },
      include: {
        orders: {
          where: { status: 'PENDING' },
          take: 1,
          orderBy: { created_at: 'desc' },
        },
      },
    });

    return this.formatTableResponse(updated);
  }

  async occupyTable(id: string): Promise<TableResponseDto> {
    const table = await this.prisma.table.findUnique({
      where: { id },
    });

    if (!table) {
      throw new NotFoundException(`Table with id ${id} not found`);
    }

    const updated = await this.prisma.table.update({
      where: { id },
      data: { status: 'OCCUPIED' },
      include: {
        orders: {
          where: { status: 'PENDING' },
          take: 1,
          orderBy: { created_at: 'desc' },
        },
      },
    });

    return this.formatTableResponse(updated);
  }

  // Get available tables for dine-in
  async getAvailableTables(): Promise<TableResponseDto[]> {
    const tables = await this.prisma.table.findMany({
      where: { status: 'AVAILABLE' },
      orderBy: { name: 'asc' },
    });

    return tables.map((t) => this.formatTableResponse(t));
  }

  // Get table occupancy status
  async getTableOccupancyStatus(): Promise<any> {
    const tables = await this.prisma.table.findMany({
      include: {
        orders: {
          where: { status: 'PENDING' },
          take: 1,
          orderBy: { created_at: 'desc' },
        },
      },
    });

    const total = tables.length;
    const occupied = tables.filter((t) => t.status === 'OCCUPIED').length;
    const available = total - occupied;

    return {
      total_tables: total,
      occupied_tables: occupied,
      available_tables: available,
      occupancy_rate: total > 0 ? ((occupied / total) * 100).toFixed(2) + '%' : '0%',
      tables: tables.map((t) => this.formatTableResponse(t)),
    };
  }

  private formatTableResponse(table: any): TableResponseDto {
    const response: TableResponseDto = {
      id: table.id,
      name: table.name,
      status: table.status as 'AVAILABLE' | 'OCCUPIED',
    };

    if (table.orders && table.orders.length > 0) {
      response.current_order = {
        id: table.orders[0].id,
        order_number: table.orders[0].order_number,
        order_type: table.orders[0].order_type,
      };
    }

    return response;
  }
}
