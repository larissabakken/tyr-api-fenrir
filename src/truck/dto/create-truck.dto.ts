import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { Truck } from '../entities/truck.entity';
import { OwnerExistsValidator } from 'src/validators/owner-exists.validator';

export class CreateTruckDto implements Truck {
  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  licensePlate: string;

  @IsNotEmpty()
  @IsString()
  chassis: string;

  @IsNotEmpty()
  @IsString()
  renavam: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsString()
  typeOfTruck?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsNumber()
  yearOfManufacture?: number;

  @IsOptional()
  @IsString()
  typeOfCart?: string;

  @IsNotEmpty()
  @IsNumber()
  numberOfAxles: number;

  @IsNotEmpty()
  @Validate(OwnerExistsValidator)
  ownerId: string;
}
