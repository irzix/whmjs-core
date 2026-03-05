import { Test, TestingModule } from '@nestjs/testing';
import { EmailTemplatesController } from './email-templates.controller';
import { EmailTemplatesService } from './email-templates.service';

describe('EmailTemplatesController', () => {
  let controller: EmailTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailTemplatesController],
      providers: [EmailTemplatesService],
    }).compile();

    controller = module.get<EmailTemplatesController>(EmailTemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
