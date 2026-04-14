import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateTableDto,
  UpdateTableDto,
  TableResponseDto,
} from './dto/table.dto';

@Injectable()
export class TableService {
  constructor(private prisma: PrismaService) {}

  async createTable(dto: CreateTableDto): Promise<TableResponseDto> {
    // Check if table name already exists in this branch
    const existing = await this.prisma.table.findFirst({
      where: {
        name: dto.name,
        branch_id: dto.branch_id || null,
      },
    });

    if (existing) {
      throw new BadRequestException(
        `Bàn có tên "${dto.name}" đã tồn tại trong chi nhánh này`,
      );
    }

    const table = await this.prisma.table.create({
      data: {
        name: dto.name,
        branch_id: dto.branch_id,
        area: dto.area || 'Chung',
        status: 'AVAILABLE',
      },
    });

    return this.formatTableResponse(table);
  }

  async getAllTables(branchId?: string): Promise<TableResponseDto[]> {
    const where: any = {};
    if (branchId) where.branch_id = branchId;

    const tables = await this.prisma.table.findMany({
      where,
      include: {
        orders: {
          where: {
            status: 'PENDING',
          },
          take: 1,
          orderBy: { created_at: 'desc' },
        },
      },
    });

    return tables
      .map((t) => this.formatTableResponse(t))
      .sort((a, b) =>
        a.name.localeCompare(b.name, undefined, {
          numeric: true,
          sensitivity: 'base',
        }),
      );
  }

  async getAvailableTables(branchId?: string): Promise<TableResponseDto[]> {
    const where: any = { status: 'AVAILABLE' };
    if (branchId) where.branch_id = branchId;

    const tables = await this.prisma.table.findMany({
      where,
    });

    return tables
      .map((t) => this.formatTableResponse(t))
      .sort((a, b) =>
        a.name.localeCompare(b.name, undefined, {
          numeric: true,
          sensitivity: 'base',
        }),
      );
  }

  async getTableById(id: string): Promise<TableResponseDto> {
    const table = await this.prisma.table.findUnique({
      where: { id },
      include: {
        orders: {
          orderBy: { created_at: 'desc' },
          take: 5,
        },
      },
    });

    if (!table) {
      throw new NotFoundException(`Không tìm thấy bàn với ID ${id}`);
    }

    return this.formatTableResponse(table);
  }

  async updateTable(
    id: string,
    dto: UpdateTableDto,
  ): Promise<TableResponseDto> {
    const table = await this.prisma.table.findUnique({
      where: { id },
    });

    if (!table) {
      throw new NotFoundException(`Không tìm thấy bàn với ID ${id}`);
    }

    if (dto.name && dto.name !== table.name) {
      const existing = await this.prisma.table.findFirst({
        where: {
          name: dto.name,
          branch_id: dto.branch_id || table.branch_id,
        },
      });
      if (existing) {
        throw new BadRequestException(`Bàn có tên "${dto.name}" đã tồn tại`);
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
      include: { orders: { take: 1 } },
    });

    if (!table) throw new NotFoundException(`Không tìm thấy bàn với ID ${id}`);

    if (table.orders.length > 0) {
      throw new BadRequestException('Không thể xóa bàn đã có lịch sử đơn hàng');
    }

    await this.prisma.table.delete({ where: { id } });
  }

  async releaseTable(id: string): Promise<TableResponseDto> {
    const table = await this.prisma.table.findUnique({
      where: { id },
      include: {
        orders: { where: { status: 'PENDING' }, take: 1 },
      },
    });

    if (!table) throw new NotFoundException(`Không tìm thấy bàn với ID ${id}`);

    if (table.orders.length > 0) {
      await this.prisma.order.update({
        where: { id: table.orders[0].id },
        data: { status: 'COMPLETED' },
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
    const table = await this.prisma.table.findUnique({ where: { id } });
    if (!table) throw new NotFoundException(`Không tìm thấy bàn với ID ${id}`);

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

  async transferTable(
    fromTableId: string,
    toTableId: string,
  ): Promise<TableResponseDto> {
    if (fromTableId === toTableId) {
      throw new BadRequestException('Không thể chuyển đơn sang cùng một bàn');
    }

    return this.prisma.$transaction(async (tx) => {
      const fromTable = await tx.table.findUnique({
        where: { id: fromTableId },
        include: { orders: { where: { status: 'PENDING' }, take: 1 } },
      });

      if (!fromTable)
        throw new NotFoundException(
          `Không tìm thấy bàn nguồn với ID ${fromTableId}`,
        );
      if (fromTable.status !== 'OCCUPIED') {
        throw new BadRequestException('Bàn nguồn đang trống, không thể chuyển');
      }

      const toTable = await tx.table.findUnique({
        where: { id: toTableId },
      });

      if (!toTable)
        throw new NotFoundException(
          `Không tìm thấy bàn đích với ID ${toTableId}`,
        );
      if (toTable.status !== 'AVAILABLE') {
        throw new BadRequestException('Bàn đích không trống (đang sử dụng)');
      }

      if (fromTable.orders && fromTable.orders.length > 0) {
        const activeOrder = fromTable.orders[0];
        // Đổi order sang bàn mới
        await tx.order.update({
          where: { id: activeOrder.id },
          data: { table_id: toTableId },
        });
      }

      // Bàn nguồn thành trống
      await tx.table.update({
        where: { id: fromTableId },
        data: { status: 'AVAILABLE' },
      });

      // Bàn đích thành occupied
      const updatedToTable = await tx.table.update({
        where: { id: toTableId },
        data: { status: 'OCCUPIED' },
        include: {
          orders: {
            where: { status: 'PENDING' },
            take: 1,
            orderBy: { created_at: 'desc' },
          },
        },
      });

      return this.formatTableResponse(updatedToTable);
    });
  }

  async getTableOccupancyStatus(branchId?: string): Promise<any> {
    const where: any = {};
    if (branchId) where.branch_id = branchId;

    const tables = await this.prisma.table.findMany({
      where,
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
      occupancy_rate:
        total > 0 ? ((occupied / total) * 100).toFixed(2) + '%' : '0%',
      tables: tables
        .map((t) => this.formatTableResponse(t))
        .sort((a, b) =>
          a.name.localeCompare(b.name, undefined, {
            numeric: true,
            sensitivity: 'base',
          }),
        ),
    };
  }

  private formatTableResponse(table: any): TableResponseDto {
    return {
      id: table.id,
      name: table.name,
      status: table.status as 'AVAILABLE' | 'OCCUPIED',
      branch_id: table.branch_id,
      area: table.area,
      current_order: table.orders?.[0]
        ? {
            id: table.orders[0].id,
            order_number: table.orders[0].order_number,
            order_type: table.orders[0].order_type,
          }
        : undefined,
    };
  }
}
