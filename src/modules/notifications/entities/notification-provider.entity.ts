import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class NotificationProviderEntity {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'smtp' })
  name: string;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiPropertyOptional({ example: { host: 'smtp.example.com', port: 587 } })
  config?: Record<string, any>;

  @ApiProperty({ example: '2023-11-20T12:00:00Z' })
  updatedAt: Date;
}
