import { PrismaClient } from '@prisma/client';
import * as casual from 'casual';

export async function seedTrucks(prisma: PrismaClient) {
  const owners = await prisma.owner.findMany();

  const trucks = owners.map((owner) => {
    const letter = casual.letter.toUpperCase();
    const description = casual.description;
    const license_plate = casual.numerify(`${letter}${letter}${letter}-####`);
    const chassis = casual.numerify(`##${letter} ${letter}${letter}${letter}${letter}${letter} #${letter} ######`);
    const renavam = casual.numerify('###########');
    const status = casual.boolean;
    const typeOfTruck = casual.word;
    const model = casual.word;
    const color = casual.color_name;
    const yearOfManufacture = casual.integer(1900, 2022);
    const typeOfCart = casual.random_element(['cegonha', 'baú', 'caçamba', 'plataforma']);
    const numberOfAxles = casual.integer(2, 10);

    return {
      description,
      license_plate: license_plate,
      chassis,
      renavam,
      status,
      type_of_truck: typeOfTruck,
      model,
      color,
      year_of_manufacture: yearOfManufacture,
      type_of_cart: typeOfCart,
      number_of_axles: numberOfAxles,
      ownerId: owner.id,
    };
  });

  await prisma.truck.createMany({ data: trucks });
}
