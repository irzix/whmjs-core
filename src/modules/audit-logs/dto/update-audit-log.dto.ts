import { PartialType } from '@nestjs/mapped-types';
import { CreateAuditLogDto } from './create-audit-log.dto';

export class UpdateAuditLogDto extends PartialType(CreateAuditLogDto) {}
