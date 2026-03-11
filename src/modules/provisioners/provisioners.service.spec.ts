import { Test, TestingModule } from '@nestjs/testing';
import { ProvisionersService } from './provisioners.service';

describe('ProvisionersService', () => {
  let service: ProvisionersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProvisionersService],
    }).compile();

    service = module.get<ProvisionersService>(ProvisionersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
