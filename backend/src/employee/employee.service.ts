import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.employee.findMany({
      include: { branch: true },
    });
  }

  async findOne(id: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: { branch: true },
    });
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async create(data: any) {
    const existing = await this.prisma.employee.findUnique({
      where: { username: data.username },
    });
    if (existing) throw new ConflictException('Username already exists');

    if (data.branch_id === "") data.branch_id = null;

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.employee.create({
      data: {
        ...data,
        position_name: data.role === 'ADMIN' ? 'Administrator' : data.role === 'MANAGER' ? 'Manager' : 'Staff',
        password: hashedPassword,
      },
    });
  }

  async update(id: string, data: any) {
    if (data.role) {
      data.position_name = data.role === 'ADMIN' ? 'Administrator' : data.role === 'MANAGER' ? 'Manager' : 'Staff';
    }
    if (data.branch_id === "") data.branch_id = null;
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.prisma.employee.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.employee.delete({
      where: { id },
    });
  }
}
