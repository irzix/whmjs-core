import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaxesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaxDto: CreateTaxDto) {
    return await this.prisma.tax.create({
      data: createTaxDto,
    });
  }

  async findAll() {
    return await this.prisma.tax.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const tax = await this.prisma.tax.findUnique({
      where: { id },
    });
    if (!tax) throw new NotFoundException(`Tax with ID ${id} not found`);
    return tax;
  }

  async update(id: number, updateTaxDto: UpdateTaxDto) {
    await this.findOne(id);
    return await this.prisma.tax.update({
      where: { id },
      data: updateTaxDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.tax.delete({
      where: { id },
    });
  }
}
