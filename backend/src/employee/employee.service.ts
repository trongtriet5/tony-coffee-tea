import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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

  private validatePassword(password: string): void {
    if (!password || password.length < 6) {
      throw new BadRequestException('Mật khẩu phải có ít nhất 6 ký tự');
    }
    if (password.length > 100) {
      throw new BadRequestException('Mật khẩu không được quá 100 ký tự');
    }
  }

  async create(data: any) {
    if (!data.username || data.username.length < 3) {
      throw new BadRequestException('Username phải có ít nhất 3 ký tự');
    }

    const existing = await this.prisma.employee.findUnique({
      where: { username: data.username },
    });
    if (existing) throw new ConflictException('Username đã tồn tại');

    this.validatePassword(data.password);

    if (data.branch_id === '') data.branch_id = null;

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.employee.create({
      data: {
        ...data,
        position_name:
          data.role === 'ADMIN'
            ? 'Administrator'
            : data.role === 'MANAGER'
              ? 'Manager'
              : 'Staff',
        password: hashedPassword,
      },
    });
  }

  async update(id: string, data: any) {
    if (data.username !== undefined && data.username.length < 3) {
      throw new BadRequestException('Username phải có ít nhất 3 ký tự');
    }

    if (data.role) {
      data.position_name =
        data.role === 'ADMIN'
          ? 'Administrator'
          : data.role === 'MANAGER'
            ? 'Manager'
            : 'Staff';
    }
    if (data.branch_id === '') data.branch_id = null;
    if (data.password) {
      this.validatePassword(data.password);
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
