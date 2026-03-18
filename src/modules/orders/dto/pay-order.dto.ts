import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class PayOrderDto {
  @ApiProperty({ description: 'ID of the payment gateway', example: 1 })
  @IsInt()
  @IsPositive()
  gatewayId: number;
}
