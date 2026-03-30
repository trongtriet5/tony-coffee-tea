import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { VoucherModule } from './voucher/voucher.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { MaterialModule } from './material/material.module';
import { RecipeModule } from './recipe/recipe.module';
import { TableModule } from './table/table.module';
import { LoggingInterceptor } from './logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    VoucherModule,
    OrderModule,
    ProductModule,
    MaterialModule,
    RecipeModule,
    TableModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
