import { Test, TestingModule } from '@nestjs/testing';
import { TaxesController } from './taxes.controller';
import { TaxesService } from './taxes.service';

describe('TaxesController', () => {
  let controller: TaxesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxesController],
      providers: [TaxesService],
    }).compile();

    controller = module.get<TaxesController>(TaxesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
