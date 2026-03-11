import { PartialType } from '@nestjs/swagger';
import { CreateProvisionerDto } from './create-provisioner.dto';

export class UpdateProvisionerDto extends PartialType(CreateProvisionerDto) {}
