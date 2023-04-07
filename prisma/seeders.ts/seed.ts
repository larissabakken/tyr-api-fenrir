import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seedUsers';
import { seedOwners } from './seedOwners';
import { seedCustomers } from './seedCustomers';
import { seedDrivers } from './seedDrivers';
import { seedTrucks } from './seedTrucks';
import { seedCarts } from './seedCarts';
import {seedVehicles} from './seedVehicles';
import { seedShipments } from './seedShipments';

const prisma = new PrismaClient();

async function seed() {
  await seedUsers(prisma);
  await seedOwners(prisma);
  await seedCustomers(prisma);
  await seedDrivers(prisma);
  await seedTrucks(prisma);
  await seedCarts(prisma);
  await seedVehicles(prisma);
  await seedShipments(prisma);

}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
