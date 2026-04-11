import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { MaterialModule } from './material/material.module';
import { RecipeModule } from './recipe/recipe.module';
import { TableModule } from './table/table.module';
import { BranchModule } from './branch/branch.module';
import { AuthModule } from './auth/auth.module';
import { LoggingInterceptor } from './logging.interceptor';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    OrderModule,
    ProductModule,
    MaterialModule,
    RecipeModule,
    TableModule,
    BranchModule,
    AuthModule,
    EmployeeModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
