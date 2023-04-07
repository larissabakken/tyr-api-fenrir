import { PrismaClient } from '@prisma/client';
import casual from 'casual';

export async function seedCustomers(prisma: PrismaClient) {
  const customers = Array.from({ length: 50 }, () => ({
    name: casual.full_name,
    cpf: casual.numerify('###########'),
    cnpj: casual.numerify('##############'),
    email: casual.email,
    phone: casual.numerify('(##) #####-####'),
    address: casual.address,
  }));

  await prisma.customers.createMany({ data: customers });
}
