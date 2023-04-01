import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './app/user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { DriverModule } from './app/driver/driver.module';
import { OwnerModule } from './app/owner/owner.module';
import { CartModule } from './app/cart/cart.module';
import { ShippingModule } from './app/shipping/shipping.module';
import { VehicleModule } from './app/vehicle/vehicle.module';
import { CustomersModule } from './app/customers/customers.module';
import { TruckModule } from './app/truck/truck.module';
import { DriversModule } from './drivers/drivers.module';
import { OwnersModule } from './owners/owners.module';
import { TrucksModule } from './trucks/trucks.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, DriverModule, OwnerModule, CartModule, ShippingModule, VehicleModule, CustomersModule, TruckModule, DriversModule, OwnersModule, TrucksModule],
  controllers: [AppController, AuthController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule {}
