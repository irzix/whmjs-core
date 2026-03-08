import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({ description: 'Organization name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Currency ID' })
  @IsNumber()
  @Type(() => Number)
  currencyId: number;

  @ApiProperty({ description: 'Users id to update', type: [Number] })
  @IsOptional()
  @IsArray()
  users: number[];
}
