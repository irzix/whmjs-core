import { Injectable } from '@nestjs/common';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';

@Injectable()
export class DomainsService {
  create(createDomainDto: CreateDomainDto) {
    return 'This action adds a new domain';
  }

  findAll() {
    return `This action returns all domains`;
  }

  findOne(id: number) {
    return `This action returns a #${id} domain`;
  }

  update(id: number, updateDomainDto: UpdateDomainDto) {
    return `This action updates a #${id} domain`;
  }

  remove(id: number) {
    return `This action removes a #${id} domain`;
  }
}
