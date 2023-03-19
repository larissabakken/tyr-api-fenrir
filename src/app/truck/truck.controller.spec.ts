import { Test, TestingModule } from '@nestjs/testing';
import { TruckController } from './truck.controller';
import { TruckService } from './truck.service';

describe('TruckController', () => {
  let controller: TruckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TruckController],
      providers: [TruckService],
    }).compile();

    controller = module.get<TruckController>(TruckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
