import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MaterialModule } from '../material/material.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, MaterialModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
