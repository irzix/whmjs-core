import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: 'The name of the role', example: 'Admin' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'An array of permission IDs associated with the role',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  permissions?: number[];
}
