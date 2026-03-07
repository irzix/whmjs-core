import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FindProductDto {
  @ApiProperty({
    description: 'Page number',
    default: 1,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    default: 10,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number;
}
