import { Test, TestingModule } from '@nestjs/testing';
import { TrucksService } from './trucks.service';

describe('TrucksService', () => {
  let service: TrucksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrucksService],
    }).compile();

    service = module.get<TrucksService>(TrucksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
