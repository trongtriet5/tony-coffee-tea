import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
    // 1. Fetch Employee and check official status
    const employee = await this.prisma.employee.findUnique({ where: { id: dto.employee_id } });
    if (!employee) throw new NotFoundException(`Nhân viên ${dto.employee_id} không tồn tại trong hệ thống.`);
    if (!employee.is_official) throw new BadRequestException(`Nhân viên ${dto.employee_id} chưa là nhân viên chính thức.`);

    // 2. Role-based allowance with 50/50 brand split
    const allowances = { STAFF: 100, MANAGER: 300, HOD: 600 };
    const maxTotalAllowance = allowances[employee.role as keyof typeof allowances] || 100;
    const maxBrandAllowance = maxTotalAllowance / 2;

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    const brandName = dto.brand || 'MAYCHA';

    // Use $queryRaw to avoid PostgreSQL enum type mismatch
    const brandUsedRaw = await this.prisma.$queryRaw<[{ total: number }]>`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM "vouchers"
      WHERE employee_id = ${dto.employee_id}
        AND brand = ${brandName}
        AND created_at >= ${firstDayOfMonth}
        AND status::text IN ('UNUSED', 'USED')
    `;
    const brandUsed = Number(brandUsedRaw[0]?.total || 0);

    if (brandUsed + dto.amount > maxBrandAllowance) {
      throw new BadRequestException(
        `Vượt quá hạn mức cho thương hiệu ${brandName} (${brandUsed}/${maxBrandAllowance}).`,
      );
    }

    // 3. Unique code generation
    let voucher_code: string;
    let isUnique = false;
    while (!isUnique) {
      voucher_code = this.generateVoucherCode();
      const existing = await this.prisma.voucher.findUnique({ where: { voucher_code } });
      if (!existing) isUnique = true;
    }

    const expires_at = new Date();
    expires_at.setDate(expires_at.getDate() + 30);

    // Insert directly with raw SQL to avoid enum type issues
    const newVoucher = await this.prisma.$queryRaw<any[]>`
      INSERT INTO "vouchers" (id, voucher_code, employee_id, amount, brand, status, expires_at, created_at)
      VALUES (
        gen_random_uuid(),
        ${voucher_code!},
        ${dto.employee_id},
        ${dto.amount},
        ${brandName},
        'UNUSED',
        ${expires_at},
        NOW()
      )
      RETURNING *
    `;
    return newVoucher[0];
  }

  async getEmployee(id: string) {
    const emp = await this.prisma.employee.findUnique({ where: { id } });
    if (!emp) throw new NotFoundException(`Nhân viên ${id} không tồn tại`);

    const allowances = { STAFF: 100, MANAGER: 300, HOD: 600 };
    const maxTotal = allowances[emp.role as keyof typeof allowances] || 100;
    const maxPerBrand = maxTotal / 2;

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);

    const brands = ['MAYCHA', 'TAMHAO'];
    const balances: any = {};

    for (const b of brands) {
      const usedRaw = await this.prisma.$queryRaw<[{ total: number }]>`
        SELECT COALESCE(SUM(amount), 0) as total
        FROM "vouchers"
        WHERE employee_id = ${id}
          AND brand = ${b}
          AND created_at >= ${firstDayOfMonth}
          AND status::text IN ('UNUSED', 'USED')
      `;
      balances[b] = maxPerBrand - Number(usedRaw[0]?.total || 0);
    }

    const totalRemaining = Object.values(balances).reduce((a: any, b: any) => a + b, 0);
    return { ...emp, balances, balance: totalRemaining };
  }

  async getStatus(voucher_code: string) {
    const voucher = await this.prisma.voucher.findUnique({ where: { voucher_code } });
    if (!voucher) throw new NotFoundException(`Mã ${voucher_code} không tồn tại`);

    if (voucher.status === 'UNUSED' && new Date() > voucher.expires_at) {
      await this.prisma.$executeRaw`
        UPDATE "vouchers" SET status = 'EXPIRED' WHERE voucher_code = ${voucher_code}
      `;
      return { ...voucher, status: 'EXPIRED' };
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
    const [data, totalRaw] = await Promise.all([
      this.prisma.voucher.findMany({ skip, take: limit, orderBy: { created_at: 'desc' } }),
      this.prisma.$queryRaw<[{ count: number }]>`SELECT COUNT(*) as count FROM "vouchers"`,
    ]);
    const total = Number(totalRaw[0]?.count || 0);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getStats() {
    const stats = await this.prisma.$queryRaw<[{
      total: number;
      unused: number;
      used: number;
      expired: number;
      total_amount: number;
    }]>`
      SELECT
        COUNT(*)                                           AS total,
        COUNT(*) FILTER (WHERE status::text = 'UNUSED')   AS unused,
        COUNT(*) FILTER (WHERE status::text = 'USED')     AS used,
        COUNT(*) FILTER (WHERE status::text = 'EXPIRED')  AS expired,
        COALESCE(SUM(amount) FILTER (WHERE status::text = 'USED'), 0) AS total_amount
      FROM "vouchers"
    `;

    const row = stats[0];
    return {
      total: Number(row.total),
      unused: Number(row.unused),
      used: Number(row.used),
      expired: Number(row.expired),
      total_discount_given: Number(row.total_amount),
    };
  }
}
