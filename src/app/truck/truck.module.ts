import { Module } from '@nestjs/common';
import { TruckService } from './truck.service';
import { TruckController } from './truck.controller';
import { OwnerModule } from '../owner/owner.module';

@Module({
  imports: [OwnerModule],
  controllers: [TruckController],
  providers: [TruckService],
})
export class TruckModule {}
