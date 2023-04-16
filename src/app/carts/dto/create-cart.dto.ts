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
import { Cart } from '../entities/cart.entity';
import { Prisma } from '@prisma/client';

export class CreateCartDto implements Cart {
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
  model?: string;

  @IsOptional()
  @IsNumber()
  year_of_manufacture?: number;

  @IsOptional()
  @IsString()
  manufacturer?: string;

  @IsOptional()
  @IsString()
  type_of_cart?: string;

  @IsNotEmpty()
  @IsNumber()
  number_of_axles: number;

  @IsNotEmpty()
  @IsString()
  @Validate(OwnerExistsValidator)
  ownerId: string;

  @IsOptional()
  @IsString()
  shipments?: Prisma.ShipmentCartUncheckedCreateNestedManyWithoutCartInput;

}
