import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Status } from "generated/prisma/enums";


export class CreateUserDto {
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(8)
    password: string;
  
    @IsOptional()
    @IsString()
    firstName?: string;
  
    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    organizationName?: string;
    
    @IsEnum(Status)
    status: Status;
  
    @IsNumber()
    roleId: number;
}
