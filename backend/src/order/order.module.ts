import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { VoucherModule } from '../voucher/voucher.module';

@Module({
  imports: [VoucherModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
