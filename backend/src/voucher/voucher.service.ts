import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVoucherDto } from './dto/voucher.dto';

@Injectable()
export class VoucherService {
  constructor(private readonly prisma: PrismaService) {}

  private generateVoucherCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const rand = (n: number) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `IPOS-${rand(4)}-${rand(4)}`;
  }

  async create(dto: CreateVoucherDto) {
    const thirtyDaysAgo = new Date(); thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentUsed = await this.prisma.voucher.count({
      where: { employee_id: dto.employee_id, status: 'USED', used_at: { gte: thirtyDaysAgo } },
    });
    if (recentUsed >= 5) throw new ConflictException(`Nhân viên ${dto.employee_id} đã dùng quá 5 voucher trong 30 ngày`);

    let voucher_code: string; let isUnique = false;
    while (!isUnique) {
      voucher_code = this.generateVoucherCode();
      const existing = await this.prisma.voucher.findUnique({ where: { voucher_code } });
      if (!existing) isUnique = true;
    }

    const expires_at = new Date(); expires_at.setDate(expires_at.getDate() + 30);
    return this.prisma.voucher.create({
      data: { voucher_code: voucher_code!, employee_id: dto.employee_id, amount: dto.amount, expires_at }
    });
  }

  async getStatus(voucher_code: string) {
    const voucher = await this.prisma.voucher.findUnique({ where: { voucher_code } });
    if (!voucher) throw new NotFoundException(`Mã ${voucher_code} không tồn tại`);
    
    // Auto expire check
    if (voucher.status === 'UNUSED' && new Date() > voucher.expires_at) {
      return this.prisma.voucher.update({ where: { voucher_code }, data: { status: 'EXPIRED' } });
    }
    return voucher;
  }

  async validate(voucher_code: string) {
    const v = await this.getStatus(voucher_code);
    if (v.status !== 'UNUSED') throw new BadRequestException(`Voucher ${voucher_code} đã được dùng hoặc hết hạn`);
    return v;
  }

  async findAll(params: { page?: number; limit?: number }) {
    const { page = 1, limit = 20 } = params;
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.voucher.findMany({ skip, take: limit, orderBy: { created_at: 'desc' } }),
      this.prisma.voucher.count()
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getStats() {
    const [total, unused, used, expired, totalAmount] = await Promise.all([
      this.prisma.voucher.count(),
      this.prisma.voucher.count({ where: { status: 'UNUSED' } }),
      this.prisma.voucher.count({ where: { status: 'USED' } }),
      this.prisma.voucher.count({ where: { status: 'EXPIRED' } }),
      this.prisma.voucher.aggregate({ _sum: { amount: true }, where: { status: 'USED' } })
    ]);
    return { total, unused, used, expired, total_discount_given: totalAmount._sum.amount || 0 };
  }
}
