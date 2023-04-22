import { PrismaClient, Status } from '@prisma/client';
import * as casual from 'casual';


export async function seedShipments(prisma: PrismaClient) {
  const drivers = await prisma.driver.findMany();
  const trucks = await prisma.truck.findMany();
  const customers = await prisma.customers.findMany();

  const shipments = Array.from({ length: 10 }, (_, i) => {
    const origin = casual.city;
    const final_destination = casual.city;
    const status = casual.random_element([Status.PENDING, Status.IN_PROGRESS, Status.CANCELED, Status.FINISHED]);
    const total_cost = casual.double(1000, 50000);
    const description = casual.description;

    const driver = drivers[Math.floor(Math.random() * drivers.length)];
    const truck = trucks[Math.floor(Math.random() * trucks.length)];
    const customer = customers[Math.floor(Math.random() * customers.length)];

    const vehicles = trucks
      .slice(0, Math.floor(Math.random() * trucks.length))
      .map((truck) => truck.id);
    const carts = Array.from({ length: Math.floor(Math.random() * 5) }, (_, i) => casual.uuid);

    return {
      origin,
      final_destination,
      status,
      total_cost,
      description,
      driverId: driver.id,
      truckId: truck.id,
      customerId: customer.id,
      vehicles,
      carts,
    };
  });

  await prisma.shipment.createMany({ data: shipments });
}
