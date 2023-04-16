import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
  ValidateIf,
} from 'class-validator';
import { OwnerExistsValidator } from 'src/app/validators/owner-exists.validator';
import { Truck } from '../entities/truck.entity';

export class CreateTruckDto implements Truck {
  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  license_plate: string;

  @IsOptional()
  @IsString()
  chassis?: string;

  @IsOptional()
  @IsString()
  renavam?: string;

  @IsNotEmpty()
  @ValidateIf((obj) =>
    obj.status === null || obj.status === undefined ? false : obj.status,
  )
  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsString()
  type_of_truck?: string;

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
  type_of_cart?: string;

  @IsNotEmpty()
  @IsNumber()
  number_of_axles: number;

  @IsNotEmpty()
  @IsString()
  ownerId: string;
}
