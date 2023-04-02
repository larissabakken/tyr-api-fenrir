import { Prisma } from '@prisma/client';
export class Customer implements Prisma.CustomersUncheckedCreateInput {
    id?: string;
    name: string;
    cpf?: string;
    cnpj?: string;
    email?: string;
    phone: string;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
