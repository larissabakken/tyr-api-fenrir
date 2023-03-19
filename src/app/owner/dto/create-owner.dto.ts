import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsNumber,
  IsOptional
} from 'class-validator';
import { Owner } from '../entities/owner.entity';

export class CreateOwnerDto implements Owner {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  FullName: string;

  @IsString()
  @MinLength(11)
  @MaxLength(11)
  @Matches(/^[0-9]+$/, {
    message: 'cpf must contain only numbers',
  })
  cpf_cnpj: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsNumber()
  phone?: number;

  @IsOptional()
  @IsString()
  address?: string;
}
