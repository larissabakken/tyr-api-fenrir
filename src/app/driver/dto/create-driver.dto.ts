import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { Driver } from '../entities/driver.entity';

export class CreateDriverDto implements Driver {
    @IsString()
    @IsNotEmpty()
    FullName: string;

    @IsString()
    @IsNotEmpty()
    cpf_cnpj: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    phone: number;

    @IsOptional()
    @IsString()
    address?: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;
}
