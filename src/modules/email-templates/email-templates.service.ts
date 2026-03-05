import { Injectable } from '@nestjs/common';
import { CreateEmailTemplateDto } from './dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from './dto/update-email-template.dto';

@Injectable()
export class EmailTemplatesService {
  create(createEmailTemplateDto: CreateEmailTemplateDto) {
    return 'This action adds a new emailTemplate';
  }

  findAll() {
    return `This action returns all emailTemplates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emailTemplate`;
  }

  update(id: number, updateEmailTemplateDto: UpdateEmailTemplateDto) {
    return `This action updates a #${id} emailTemplate`;
  }

  remove(id: number) {
    return `This action removes a #${id} emailTemplate`;
  }
}
