import {
  IsNotEmpty,
  IsOptional,
  MATCHES,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Shipment } from '../entities/shipment.entity';
import { Prisma, Status } from '@prisma/client';

export class CreateShipmentDto extends Shipment {
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(150)
  origin: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(150)
  final_destination: string;

  @IsOptional()
  date_delivered?: string | Date;

  @IsOptional()
  date_finalized?: string | Date;

  @IsOptional()
  date_initiated?: string | Date;

  @IsOptional()
  status: Status;

  @IsOptional()
  total_cost: number;

  @IsOptional()
  description: string;

  @IsOptional()
  driverId?: string;

  @IsOptional()
  truckId?: string;

  @IsOptional()
  customerId?: string;

  @IsOptional()
  cartId?: string;

  @IsOptional()
  vehicles?: Prisma.ShipmentVehicleUncheckedCreateNestedManyWithoutShipmentInput;
}
