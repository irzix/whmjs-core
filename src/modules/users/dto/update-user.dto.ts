import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Status } from 'generated/prisma/enums';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsEnum(Status)
    status?: Status;
  
    @IsOptional()
    @IsNumber()
    roleId?: number;
  
    @IsOptional()
    @IsNumber()
    organizationId?: number;
}
