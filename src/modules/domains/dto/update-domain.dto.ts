import { PartialType } from '@nestjs/mapped-types';
import { CreateDomainDto } from './create-domain.dto';

export class UpdateDomainDto extends PartialType(CreateDomainDto) {}
