import { Test, TestingModule } from '@nestjs/testing';
import { TruckService } from './truck.service';

describe('TruckService', () => {
  let service: TruckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TruckService],
    }).compile();

    service = module.get<TruckService>(TruckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
