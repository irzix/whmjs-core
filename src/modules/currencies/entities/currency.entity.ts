import { ApiProperty } from '@nestjs/swagger';

export class CurrencyEntity {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'US Dollar' })
  name: string;

  @ApiProperty({ example: 'USD' })
  code: string;

  @ApiProperty({ example: '$' })
  symbol: string;

  @ApiProperty({ example: 1.0 })
  rate: number;

  @ApiProperty({ example: true })
  isDefault: boolean;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
