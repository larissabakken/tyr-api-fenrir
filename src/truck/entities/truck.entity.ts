import { Prisma } from '@prisma/client';

export class Truck implements Prisma.TruckUncheckedCreateInput{
    id?: string;
    description?: string;
    price: number;
    licensePlate: string;
    chassis: string;
    renavam: string;
    status: boolean;
    typeOfTruck?: string;
    model?: string;
    color?: string;
    yearOfManufacture?: number;
    typeOfCart?: string;
    numberOfAxles: number;
    ownerId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
