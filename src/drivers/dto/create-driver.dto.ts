import { IsString, IsNotEmpty, IsBoolean, IsOptional, Matches, ValidateIf } from 'class-validator';
import { Driver } from '../entities/driver.entity';

export class CreateDriverDto implements Driver{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @ValidateIf((obj) => !obj.cpf || !obj.cnpj, { message: 'CPF or CNPJ is required' } )
    @Matches(/^[0-9]{11}$/, { message: 'Invalid CPF' })
    cpf: string;

    @IsString()
    @ValidateIf((obj) => !obj.cpf || !obj.cnpj, { message: 'CPF or CNPJ is required' } )
    @Matches(/^[0-9]{14}$/, { message: 'Invalid CNPJ' })
    cnpj: string;


    @IsString()
    @IsOptional()
    @Matches(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/, { message: 'Invalid email' })
    email: string;

    @IsString()
    @Matches(/^[0-9]{10,11}$/, { message: 'Invalid phone number' })
    phone: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsBoolean()
    @ValidateIf((obj) => obj.status === undefined || obj.status === null? obj.status = false : obj.status)
    status: boolean;
}
