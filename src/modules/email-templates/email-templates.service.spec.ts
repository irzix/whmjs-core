import { Test, TestingModule } from '@nestjs/testing';
import { EmailTemplatesService } from './email-templates.service';

describe('EmailTemplatesService', () => {
  let service: EmailTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailTemplatesService],
    }).compile();

    service = module.get<EmailTemplatesService>(EmailTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
