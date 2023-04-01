import { Module } from '@nestjs/common';
import { TrucksService } from './trucks.service';
import { TrucksController } from './trucks.controller';

@Module({
  controllers: [TrucksController],
  providers: [TrucksService]
})
export class TrucksModule {}
