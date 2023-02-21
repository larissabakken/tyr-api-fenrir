import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
    id?: string;
    email: string;
    password: string;
    name: string;
    cpf: string;
    createdAt?: Date;
    updatedAt?: Date;
}

