import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UpdateSettingDto {
  @ApiProperty({
    example: 'My Hosting Company',
    description: 'Setting value (stored as JSON)',
  })
  @IsNotEmpty()
  value: any;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether this setting is publicly accessible',
  })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}
