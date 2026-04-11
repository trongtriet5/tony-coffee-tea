import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const connectionStringStr = process.env.DATABASE_URL || 'mysql://root:trongtriet5@localhost:3306/ipos';
const connectionString = connectionStringStr.replace(/^mysql:\/\//, 'mariadb://');

const adapter = new PrismaMariaDb(connectionString);

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      adapter,
      log: ['error', 'warn'],
    } as any);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
