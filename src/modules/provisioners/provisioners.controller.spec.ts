import { Test, TestingModule } from '@nestjs/testing';
import { ProvisionersController } from './provisioners.controller';
import { ProvisionersService } from './provisioners.service';

describe('ProvisionersController', () => {
  let controller: ProvisionersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvisionersController],
      providers: [ProvisionersService],
    }).compile();

    controller = module.get<ProvisionersController>(ProvisionersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
