import { PrismaClient } from '@prisma/client';
import * as casual from 'casual';

export async function seedOwners(prisma: PrismaClient) {
  const owners = new Array(50).fill(null).map(() => ({
    name: casual.name,
    cpf: casual.numerify('###########'),
    cnpj: casual.numerify('##############'),
    email: casual.email,
    phone: casual.numerify('###########'),
    address: casual.address,
  }));

  await prisma.owner.createMany({ data: owners });
}
