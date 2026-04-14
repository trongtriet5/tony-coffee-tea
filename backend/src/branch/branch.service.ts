import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBranchDto, UpdateBranchDto } from './dto/branch.dto';

@Injectable()
export class BranchService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBranchDto) {
    return this.prisma.branch.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.branch.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const branch = await this.prisma.branch.findUnique({
      where: { id },
    });
    if (!branch) throw new NotFoundException(`Branch with ID ${id} not found`);
    return branch;
  }

  async update(id: string, dto: UpdateBranchDto) {
    await this.findOne(id);
    return this.prisma.branch.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    const branch = await this.findOne(id);

    const [orderCount, employeeCount, tableCount, materialCount] = await Promise.all([
      this.prisma.order.count({ where: { branch_id: id } }),
      this.prisma.employee.count({ where: { branch_id: id } }),
      this.prisma.table.count({ where: { branch_id: id } }),
      this.prisma.material.count({ where: { branch_id: id } }),
    ]);

    const relatedRecords: string[] = [];
    if (orderCount > 0) relatedRecords.push(`${orderCount} đơn hàng`);
    if (employeeCount > 0) relatedRecords.push(`${employeeCount} nhân viên`);
    if (tableCount > 0) relatedRecords.push(`${tableCount} bàn`);
    if (materialCount > 0) relatedRecords.push(`${materialCount} nguyên vật liệu`);

    if (relatedRecords.length > 0) {
      throw new BadRequestException(
        `Không thể xóa chi nhánh "${branch.name}". Chi nhánh có: ${relatedRecords.join(', ')}. Vui lòng xóa các bản ghi liên quan trước.`,
      );
    }

    return this.prisma.branch.delete({
      where: { id },
    });
  }
}
