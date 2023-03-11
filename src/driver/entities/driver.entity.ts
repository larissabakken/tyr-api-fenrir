import { Prisma } from "@prisma/client";

export class Driver implements Prisma.DriverUncheckedCreateInput{
    id?: string;
    FullName: string;
    cpf_cnpj: string;
    email: string;
    phone: number;
    status: boolean;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
