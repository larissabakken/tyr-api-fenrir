import { Prisma } from '@prisma/client';

export class Owner implements Prisma.OwnerUncheckedCreateInput {
    id?: string;
    FullName: string;
    cpf_cnpj: string;
    email: string;
    phone?: number;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
