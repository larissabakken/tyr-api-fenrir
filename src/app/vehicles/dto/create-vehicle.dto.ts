import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { Prisma, Status } from '@prisma/client';
import { Vehicle } from '../entities/vehicle.entity';


export class CreateVehicleDto implements Vehicle {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  price?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  origin: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  destination: string;

  @IsOptional()
  date_initiated?: string | Date;

  @IsOptional()
  date_finalized?: string | Date;

  @IsNotEmpty()
  @IsString()
  status: Status;

  @IsNotEmpty()
  @IsString()
  license_plate: string;

  @IsOptional()
  @IsString()
  chassis?: string;

  @IsOptional()
  @IsString()
  renavam?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsNumber()
  year_of_manufacture?: number;

  @IsOptional()
  @IsString()
  manufacturer?: string;

  @IsOptional()
  @IsString()
  type_of_vehicle?: string;

  @IsNotEmpty()
  @IsString()
  ownerId: string;

  @IsOptional()
  @IsString()
  shipments?: Prisma.ShipmentVehicleUncheckedCreateNestedManyWithoutVehicleInput;

}
