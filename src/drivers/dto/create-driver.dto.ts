import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  Matches,
  ValidateIf,
  IsEmail,
} from 'class-validator';
import { Driver } from '../entities/driver.entity';

export class CreateDriverDto implements Driver {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ValidateIf((obj) => !obj.cpf || !obj.cnpj, {
    message: 'CPF or CNPJ is required',
  })
  @Matches(/^[0-9]{11}$/, { message: 'Invalid CPF' })
  cpf: string;

  @IsString()
  @ValidateIf((obj) => !obj.cpf || !obj.cnpj, {
    message: 'CPF or CNPJ is required',
  })
  @Matches(/^[0-9]{14}$/, { message: 'Invalid CNPJ' })
  cnpj: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^[0-9]{10,11}$/, { message: 'Invalid phone number' })
  phone: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsBoolean()
  @ValidateIf((obj) =>
    obj.status === undefined || obj.status === null
      ? (obj.status = false)
      : obj.status,
  )
  status: boolean;
}
