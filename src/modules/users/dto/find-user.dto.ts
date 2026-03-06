import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class FindUserDto {
  
    @ApiProperty({ description: 'page number' })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    page?: number;


    @ApiProperty({ description: 'limit number' })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit?: number;
}