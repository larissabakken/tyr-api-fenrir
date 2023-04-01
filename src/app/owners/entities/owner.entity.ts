import { Prisma } from '@prisma/client';

export class Owner implements Prisma.OwnerUncheckedCreateInput{
    id?: string; 
    name: string;
    cpf?: string;
    cnpj?: string;
    email: string;
    phone?: string;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
