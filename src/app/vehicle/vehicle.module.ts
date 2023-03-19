import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';

@Module({
  controllers: [VehicleController],
  providers: [VehicleService]
})
export class VehicleModule {}
