import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Customer } from '../entities/customer.entity';

export class CreateCustomerDto implements Customer {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsString()
  @ValidateIf((obj) => !obj.cpf || !obj.cnpj, {
    message: 'CPF or CNPJ is required',
  })
  @Matches(/^[0-9]{11}$/, { message: 'Invalid CPF' })
  cpf?: string;

  @IsString()
  @IsString()
  @ValidateIf((obj) => !obj.cpf || !obj.cnpj, {
    message: 'CPF or CNPJ is required',
  })
  @Matches(/^[0-9]{14}$/, { message: 'Invalid CNPJ' })
  cnpj?: string;
  @IsEmail()
  @IsOptional()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @Matches(/^[0-9]{8,15}$/, { message: 'Invalid phone number' })
  phone: string;

  @IsOptional()
  @IsString()
  address?: string;
}
