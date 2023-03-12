import { Module } from '@nestjs/common';
import { TruckService } from './truck.service';
import { TruckController } from './truck.controller';

@Module({
  controllers: [TruckController],
  providers: [TruckService],
  exports: [TruckService],
})
export class TruckModule {}
