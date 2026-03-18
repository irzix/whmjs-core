import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PayInvoiceDto {
  @ApiProperty({ description: 'ID of the payment gateway', example: 1 })
  @IsNumber()
  gatewayId: number;
}
