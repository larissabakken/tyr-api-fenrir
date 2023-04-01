import { Test, TestingModule } from '@nestjs/testing';
import { TrucksController } from './trucks.controller';
import { TrucksService } from './trucks.service';

describe('TrucksController', () => {
  let controller: TrucksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrucksController],
      providers: [TrucksService],
    }).compile();

    controller = module.get<TrucksController>(TrucksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
