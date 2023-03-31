import { Prisma } from "@prisma/client";

export class Driver implements Prisma.DriverUncheckedCreateInput{
    id?: string;
    name: string;
    cnpj?: string;
    cpf?: string;
    email?: string;
    phone: string;
    status: boolean;
    address?: string;

    createdAt?: Date;
    updatedAt?: Date;
}
