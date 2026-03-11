import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProvisionersService } from './provisioners.service';
import { CreateProvisionerDto } from './dto/create-provisioner.dto';
import { UpdateProvisionerDto } from './dto/update-provisioner.dto';

@Controller('provisioners')
export class ProvisionersController {
  constructor(private readonly provisionersService: ProvisionersService) {}

  @Post()
  create(@Body() createProvisionerDto: CreateProvisionerDto) {
    return this.provisionersService.create(createProvisionerDto);
  }

  @Get()
  findAll() {
    return this.provisionersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provisionersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProvisionerDto: UpdateProvisionerDto) {
    return this.provisionersService.update(+id, updateProvisionerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.provisionersService.remove(+id);
  }
}
