import { Prisma } from '@prisma/client';

export class Cart implements Prisma.CartUncheckedCreateInput {
  id?: string;
  description?: string;
  status: boolean;
  license_plate: string;
  chassis?: string;
  renavam?: string;
  model?: string;
  manufacturer?: string;
  number_of_axles?: number;
  year_of_manufacture?: number;
  type_of_cart?: string;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
