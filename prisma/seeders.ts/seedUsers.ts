import { PrismaClient, Permission } from '@prisma/client';
import * as casual from 'casual';

export async function seedUsers(prisma: PrismaClient) {
  const users = Array(10).fill(0).map(() => {
    const name = casual.name;
    const email = casual.email;
    const password = casual.password;
    const cpf = casual.numerify('###########');
    const permission = casual.random_element(Object.values(Permission));

    return {
      name,
      email,
      password,
      cpf,
      permission,
    };
  });

  await prisma.user.createMany({ data: users });
}
