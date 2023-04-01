import {
  IsString,
  IsEmail,
  MaxLength,
  MinLength,
  Matches,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { Owner } from '../entities/owner.entity';

export class CreateOwnerDto implements Owner {
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
  @Matches(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i, {
    message: 'invalid email',
  })
  email: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]+$/, { message: 'phone must contain only numbers' })
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
