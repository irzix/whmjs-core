import { Permission } from 'generated/prisma/client';

export class CreateRoleDto {
  name: string;
  permissions: Permission[];
}
