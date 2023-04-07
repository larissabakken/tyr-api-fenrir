import { PrismaClient } from '@prisma/client';
import * as casual from 'casual';

export async function seedCarts(prisma: PrismaClient) {
  const owners = await prisma.owner.findMany();

  const carts = owners.map((owner) => {
    const letter = casual.letter.toUpperCase();
    const description = casual.description;
    const license_plate = casual.numerify(`${letter}${letter}${letter}-####`);
    const chassis = casual.numerify(
      `##${letter} ${letter}${letter}${letter}${letter}${letter} #${letter} ######`,
    );
    const renavam = casual.numerify('###########');
    const status = casual.boolean;
    const model = casual.word;
    const manufacturer = casual.company_name;
    const number_of_axles = casual.integer(2, 10);
    const year_of_manufacture = casual.integer(1900, 2022);
    const type_of_cart = casual.random_element([
      'cegonha',
      'baú',
      'caçamba',
      'plataforma',
    ]);

    return {
      description,
      status,
      license_plate,
      chassis,
      renavam,
      model,
      manufacturer,
      number_of_axles,
      year_of_manufacture,
      type_of_cart,
      ownerId: owner.id,
    };
  });

  await prisma.cart.createMany({ data: carts });
}
