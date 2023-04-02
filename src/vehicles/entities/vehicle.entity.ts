import { Prisma } from '@prisma/client';

export class Vehicle implements Prisma.VehicleUncheckedCreateInput{
    id?: string;
    description?: string;
    origin: string;
    destination: string;
    license_plate: string;
    chassis?: string;
    renavam?: string;
    model?: string;
    color?: string;
    yearOfManufacture?: number;
    manufacture?: string;
    typeOfVehicle?: string;
    ownerId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
