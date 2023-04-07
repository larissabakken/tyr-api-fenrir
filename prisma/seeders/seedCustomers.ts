import { PrismaClient } from '@prisma/client';
import * as casual from 'casual';

export async function seedCustomers(prisma: PrismaClient) {
  const customers = Array.from({ length: 50 }, () => {
    const name = casual.name;
    const cnpj = casual.numerify('##############');
    const email = casual.email;
    const phone = casual.numerify('(##) #####-####');
    const address = casual.city;

    return {
      name,
      cnpj,
      email,
      phone,
      address,
    };
  });

  await prisma.customers.createMany({ data: customers });
}
