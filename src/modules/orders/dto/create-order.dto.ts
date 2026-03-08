import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ description: 'Gateway ID for payment', required: false })
  @IsInt()
  @IsPositive()
  gatewayId: number;

  @ApiProperty({ description: 'Coupon code', required: false })
  @IsString()
  @IsOptional()
  coupon?: string;
}
