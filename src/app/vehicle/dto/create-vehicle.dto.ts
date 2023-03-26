import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Vehicle } from '../entities/vehicle.entity';

export class CreateVehicleDto implements Vehicle{

    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(200)
    description?: string;

    @IsString()
    @MinLength(2)
    image: string;

    @IsString()
    @MinLength(2)
    @MaxLength(100)
    origin: string;

    @IsString()
    @MinLength(2)
    @MaxLength(100)
    destination: string;

    @IsString()
    @MinLength(2)
    @MaxLength(100)
    licensePlate: string;

    @IsString()
    @MinLength(2)
    @MaxLength(100)
    chassis: string;

    @IsString()
    @MinLength(2)
    @MaxLength(100)
    renavam: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    model?: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    color?: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    manufacture?: string;

    @IsOptional()
    @IsNumber()
    yearOfManufacture?: number;

    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    typeOfVehicule?: string;

    @IsNotEmpty()
    ownerId: string;

}
