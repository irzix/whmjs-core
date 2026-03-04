import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(+id);
  }
}
