import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Cart } from '../entities/cart.entity';
export class CreateCartDto implements Cart {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(200)
    description?: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    ownerId: string;
    
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsBoolean()
    @IsNotEmpty()
    status: boolean;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    licensePlate: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    chassis: string;
    
    @IsString()
    @IsNotEmpty()
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
    numberOfAxles?: number;
    
    @IsOptional()
    @IsNumber()
    yearOfManufacture?: number;
    
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    typeOfCart?: string;

}
