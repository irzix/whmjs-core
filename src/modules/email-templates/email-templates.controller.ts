import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailTemplatesService } from './email-templates.service';
import { CreateEmailTemplateDto } from './dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from './dto/update-email-template.dto';

@Controller('email-templates')
export class EmailTemplatesController {
  constructor(private readonly emailTemplatesService: EmailTemplatesService) {}

  @Post()
  create(@Body() createEmailTemplateDto: CreateEmailTemplateDto) {
    return this.emailTemplatesService.create(createEmailTemplateDto);
  }

  @Get()
  findAll() {
    return this.emailTemplatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailTemplatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmailTemplateDto: UpdateEmailTemplateDto) {
    return this.emailTemplatesService.update(+id, updateEmailTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailTemplatesService.remove(+id);
  }
}
