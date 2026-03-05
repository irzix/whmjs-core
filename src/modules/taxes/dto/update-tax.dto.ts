import { PartialType } from '@nestjs/mapped-types';
import { CreateTaxDto } from './create-tax.dto';

export class UpdateTaxDto extends PartialType(CreateTaxDto) {}
