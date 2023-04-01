import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Customer } from '../entities/customer.entity';

export class CreateCustomerDto implements Customer{
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    cpf_cnpj: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsNumber()
    @IsNotEmpty()
    phone: number;

    @IsOptional()
    @IsString()
    address?: string;
    
}
