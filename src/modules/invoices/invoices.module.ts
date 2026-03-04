import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
