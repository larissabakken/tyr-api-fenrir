import { Prisma } from '@prisma/client';
export class Customer implements Prisma.CustomersUncheckedCreateInput {
    id?: string;
    name: string;
    cpf_cnpj: string;
    email: string;
    phone: number;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
