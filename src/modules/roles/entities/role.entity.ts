import { ApiProperty } from '@nestjs/swagger';

export class PermissionEntity {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'users' })
  resource: string;

  @ApiProperty({ example: 'read' })
  action: string;

  @ApiProperty({ example: 'all' })
  scope: string;
}

export class RoleEntity {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Admin' })
  name: string;

  @ApiProperty({ type: [PermissionEntity] })
  permissions: PermissionEntity[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
