import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class NotificationLogEntity {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'email' })
  type: string;

  @ApiProperty({ example: 'user@example.com' })
  to: string;

  @ApiPropertyOptional({ example: 'Invoice Paid' })
  subject?: string;

  @ApiProperty({ example: 'sent' })
  status: string;

  @ApiPropertyOptional({ example: 'Connection timeout' })
  error?: string;

  @ApiProperty({ example: 1 })
  providerId: number;

  @ApiProperty({ example: '2023-11-20T12:00:00Z' })
  createdAt: Date;
}
