import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailTemplateDto } from './create-email-template.dto';

export class UpdateEmailTemplateDto extends PartialType(CreateEmailTemplateDto) {}
