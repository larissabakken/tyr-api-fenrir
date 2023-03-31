import { Prisma } from "@prisma/client";

export class Driver implements Prisma.DriverUncheckedCreateInput{
    id?: string;
    name: string;
    cnpj?: string;
    cpf?: string;
    email: string;
    phone: number;
    status: boolean;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
