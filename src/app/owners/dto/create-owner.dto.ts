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
  @IsOptional()
  @ValidateIf((obj) => !obj.cpf || !obj.cnpj, {
    message: 'CPF or CNPJ is required',
  })
  @Matches(/^[0-9]{11}$/, { message: 'Invalid CPF' })
  cpf?: string;

  @IsOptional()
  @IsString()
  @ValidateIf((obj) => !obj.cpf || !obj.cnpj, {
    message: 'CPF or CNPJ is required',
  })
  @Matches(/^[0-9]{14}$/, { message: 'Invalid CNPJ' })
  cnpj?: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]+$/, { message: 'phone must contain only numbers' })
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
