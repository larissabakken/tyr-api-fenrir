import { Prisma } from '@prisma/client';

export class Truck implements Prisma.TruckUncheckedCreateInput {
  id?: string;
  description?: string;
  license_plate: string;
  chassis?: string;
  renavam?: string;
  status: boolean;
  type_of_truck?: string;
  model?: string;
  color?: string;
  year_of_manufacture?: number;
  type_of_cart?: string;
  number_of_axles: number;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
