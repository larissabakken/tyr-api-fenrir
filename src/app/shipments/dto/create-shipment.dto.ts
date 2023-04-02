import {
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsEnum,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { Prisma, Status } from '@prisma/client';
import { Shipment } from '../entities/shipment.entity';

export class CreateShipmentDto implements Shipment {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  origin: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  final_destination: string;

  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsNumber()
  total_cost?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  driverId: string;

  @IsNotEmpty()
  @IsString()
  customerId: string;

  @IsNotEmpty()
  @IsString()
  truckId: string;

  vehicles?: Prisma.VehiclesShipmentUncheckedCreateNestedManyWithoutShipmentsInput;

  carts?: Prisma.CartsShipmentUncheckedCreateNestedManyWithoutShipmentsInput;

  @IsOptional()
  createdAt?: string | Date;

  @IsOptional()
  updatedAt?: string | Date;
}
