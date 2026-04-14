import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['error', 'warn'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    if (process.env.VERCEL) {
      await this.$connect();
    } else {
      await this.$connect();
    }
  }

  async onModuleDestroy() {
    if (!process.env.VERCEL) {
      await this.$disconnect();
    }
  }
}
