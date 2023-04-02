import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ShipmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createShipmentDto: CreateShipmentDto) {
    const { driverId, customerId, truckId, carts, vehicles, ...rest } =
      createShipmentDto;

    const isCartsExists = async () => {
      if (carts) {
        const cartsPromise = carts.map(async (cart) => {
          const cartExists = await this.prisma.cart.findUnique({
            where: { id: cart },
          });
          if (!cartExists) throw new Error('Cart not found');
          return cartExists;
        });
        return Promise.all(cartsPromise);
      }
      return [];
    };

    const isVehiclesExists = async () => {
      if (vehicles) {
        const vehiclesPromise = vehicles.map(async (vehicle) => {
          const vehicleExists = await this.prisma.vehicle.findUnique({
            where: { id: vehicle },
          });
          if (!vehicleExists) throw new Error('Vehicle not found');
          return vehicleExists;
        });
        return Promise.all(vehiclesPromise);
      }
      return [];
    };

    const dataCarts = await isCartsExists();
    const dataVehicles = await isVehiclesExists();

    const shipments = await this.prisma.shipment.create({
      data: {
        ...rest,
        carts,
        vehicles,
        driver: {
          connect: { id: driverId },
        },
        customer: {
          connect: { id: customerId },
        },
        truck: {
          connect: { id: truckId },
        },
      },
      include: {
        driver: true,
        truck: true,
        customer: true,
      },
    });

    return { data: shipments, carts: dataCarts, vehicles: dataVehicles };
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: any[]; total: number }> {
    const skip = (page - 1) * limit;
    const take = limit;

    const [data, total] = await Promise.all([
      this.prisma.shipment.findMany({
        skip: isNaN(skip) ? 0 : skip,
        take: isNaN(take) ? 2 : take,
        include: {
          driver: true,
          truck: true,
          customer: true,
        },
      }),
      this.prisma.shipment.count(),
    ]);

    const dataShipments = await Promise.all(
      data.map(async (shipment) => {
        console.log(shipment.carts);
        const carts = await Promise.all(
          shipment.carts.map(async (cartId) => {
            const cart = await this.prisma.cart.findUnique({
              where: { id: cartId },
            });
            return cart;
          }),
        );

        const vehicles = await Promise.all(
          shipment.vehicles.map(async (vehicleId) => {
            const vehicle = await this.prisma.vehicle.findUnique({
              where: { id: vehicleId },
            });
            return vehicle;
          }),
        );

        return { shipment: shipment, carts: carts, vehicles: vehicles };
      }),
    );

    return { data: dataShipments, total };
  }

  async findOne(id: string) {
    if (!id) {
      throw new Error('ID is required');
    }

    return await this.prisma.shipment.findUnique({
      where: { id },
      include: {
        driver: true,
        truck: true,
        customer: true,
      },
    });
  }

  async update(id: string, updateShipmentDto: UpdateShipmentDto) {
    return await this.prisma.shipment.update({
      where: { id },
      data: { ...updateShipmentDto },
    });
  }

  async remove(id: string) {
    return await this.prisma.shipment.delete({ where: { id } });
  }
}
