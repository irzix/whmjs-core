import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { PaymentGatewaysModule } from '../payment-gateways/payment-gateways.module';

@Module({
  imports: [PaymentGatewaysModule],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule { }
