import { Injectable } from '@nestjs/common';
import { CreateProvisionerDto } from './dto/create-provisioner.dto';
import { UpdateProvisionerDto } from './dto/update-provisioner.dto';

@Injectable()
export class ProvisionersService {
  create(createProvisionerDto: CreateProvisionerDto) {
    return 'This action adds a new provisioner';
  }

  findAll() {
    return `This action returns all provisioners`;
  }

  findOne(id: number) {
    return `This action returns a #${id} provisioner`;
  }

  update(id: number, updateProvisionerDto: UpdateProvisionerDto) {
    return `This action updates a #${id} provisioner`;
  }

  remove(id: number) {
    return `This action removes a #${id} provisioner`;
  }
}
