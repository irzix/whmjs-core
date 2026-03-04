import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServersService } from './servers.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';

@Controller('servers')
export class ServersController {
  constructor(private readonly serversService: ServersService) {}

  @Post()
  create(@Body() createServerDto: CreateServerDto) {
    return this.serversService.create(createServerDto);
  }

  @Get()
  findAll() {
    return this.serversService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serversService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto) {
    return this.serversService.update(+id, updateServerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serversService.remove(+id);
  }
}
