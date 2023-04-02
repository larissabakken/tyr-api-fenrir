import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './app/users/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CartsModule } from './app/carts/carts.module';
import { ShipmentsModule } from './app/shipments/shipments.module';
import { CustomersModule } from './app/customers/customers.module';
import { OwnersModule } from './app/owners/owners.module';
import { VehiclesModule } from './app/vehicles/vehicles.module';
import { TrucksModule } from './app/trucks/trucks.module';
import { DriversModule } from './app/drivers/drivers.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, CartsModule, ShipmentsModule, CustomersModule, VehiclesModule, OwnersModule, TrucksModule, DriversModule],
  controllers: [AppController, AuthController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule {}
