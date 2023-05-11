import { Module } from '@nestjs/common';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

import { AuthController } from './auth/auth.controller';

import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { UserModule } from './app/users/user.module';
import { AuthModule } from './auth/auth.module';
import { CartsModule } from './app/carts/carts.module';
import { ShipmentsModule } from './app/shipments/shipments.module';
import { CustomersModule } from './app/customers/customers.module';
import { OwnersModule } from './app/owners/owners.module';
import { VehiclesModule } from './app/vehicles/vehicles.module';
import { TrucksModule } from './app/trucks/trucks.module';
import { DriversModule } from './app/drivers/drivers.module';
import { AwsS3Module } from './app/aws/awsS3.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    CartsModule,
    ShipmentsModule,
    CustomersModule,
    VehiclesModule,
    OwnersModule,
    TrucksModule,
    DriversModule,
    AwsS3Module,
  ],
  controllers: [AuthController, AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
