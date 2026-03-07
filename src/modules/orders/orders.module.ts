import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { CouponsCalculator } from '../coupons/coupons.calculator';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, CouponsCalculator],
})
export class OrdersModule {}
