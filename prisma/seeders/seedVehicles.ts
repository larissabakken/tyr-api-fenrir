import { PrismaClient, Status } from '@prisma/client';
import * as casual from 'casual';

export async function seedVehicles(prisma: PrismaClient) {
  const owners = await prisma.owner.findMany();

  const vehicles = owners.map((owner) => {
    const letter = casual.letter.toUpperCase();
    const description = casual.description;
    const status = Status.PENDING;
    const price = casual.double(1, 100000);
    const origin = casual.city;
    const destination = casual.city;
    const license_plate = casual.numerify(`${letter}${letter}${letter}-####`);
    const chassis = casual.numerify(`##${letter} ${letter}${letter}${letter}${letter}${letter} #${letter} ######`);
    const renavam = casual.numerify('###########');
    const model = casual.word;
    const color = casual.color_name;
    const manufacturer = casual.company_name;
    const yearOfManufacture = casual.integer(1900, 2022);
    const typeOfVehicle = casual.random_element(['SUV', 'Caminhonete', 'Motocicleta', 'Van']);

    return {
      description,
      price,
      origin,
      status,
      destination,
      license_plate: license_plate,
      chassis,
      renavam,
      model,
      color,
      manufacturer,
      year_of_manufacture: yearOfManufacture,
      type_of_vehicle: typeOfVehicle,
      ownerId: owner.id,
    };
  });

  await prisma.vehicle.createMany({ data: vehicles });
}
