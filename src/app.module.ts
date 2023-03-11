import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { DriverModule } from './driver/driver.module';
import { OwnerModule } from './owner/owner.module';
import { CartModule } from './cart/cart.module';
import { ShippingModule } from './shipping/shipping.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { CustomersModule } from './customers/customers.module';
import { TruckModule } from './truck/truck.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, DriverModule, OwnerModule, CartModule, ShippingModule, VehicleModule, CustomersModule, TruckModule],
  controllers: [AppController, AuthController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule {}
