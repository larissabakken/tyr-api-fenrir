import { Prisma } from '@prisma/client';

export class Cart implements Prisma.CartUncheckedCreateInput {
    id?: string;
    ownerId: string;
    createdAt?: Date;
    updatedAt?: Date;
    description?: string;
    price: number;
    status: boolean;
    licensePlate: string;
    chassis: string;
    renavam: string;
    model?: string;
    manufacture?: string;
    numberOfAxles?: number;
    yearOfManufacture?: number;
    typeOfCart?: string;

}
