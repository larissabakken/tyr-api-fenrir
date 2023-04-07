import { PrismaClient } from '@prisma/client';
import * as casual from 'casual';

export async function seedDrivers(prisma: PrismaClient) {
  const drivers = Array.from({ length: 50 }, () => ({
    name: casual.name,
    cpf: casual.numerify('###########'),
    cnpj: casual.numerify('##############'),
    email: casual.email,
    phone: casual.numerify('(##) #####-####'),
    address: casual.address,
    status: casual.boolean,
  }));

  await prisma.driver.createMany({ data: drivers });
}
