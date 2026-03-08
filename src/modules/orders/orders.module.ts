import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { CouponsCalculator } from '../coupons/coupons.calculator';
import { PaymentGatewaysModule } from '../payment-gateways/payment-gateways.module';

@Module({
  imports: [PaymentGatewaysModule],
  controllers: [OrdersController],
  providers: [OrdersService, CouponsCalculator],
})
export class OrdersModule { }
