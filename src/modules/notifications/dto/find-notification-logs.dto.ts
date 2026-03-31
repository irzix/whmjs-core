import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class FindNotificationLogsDto extends PaginationDto {
  @ApiPropertyOptional({ example: 'email' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ example: 'sent' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  providerId?: number;
}
