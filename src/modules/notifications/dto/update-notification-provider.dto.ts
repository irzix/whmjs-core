import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';

export class UpdateNotificationProviderDto {
  @ApiPropertyOptional({ description: 'Provider config as JSON object' })
  @IsOptional()
  @IsObject()
  config?: Record<string, unknown>;
}
