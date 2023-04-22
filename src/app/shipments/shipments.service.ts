import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShipmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createShipmentDto: CreateShipmentDto) {
    const { driverId, truckId, customerId, cartId, vehicles, ...shipmentData } =
      createShipmentDto;

    try {
      const shipment = await this.prisma.shipment.create({
        data: {
          ...shipmentData,
          driver: {
            connect: { id: driverId },
          },
          truck: {
            connect: { id: truckId },
          },
          customer: {
            connect: { id: customerId },
          },
          cart: {
            connect: { id: cartId },
          },
        },
      });
      return shipment;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addVehicle(id: string, vehicleId: string) {
    try {
      const shipmentVehicle = await this.prisma.shipmentVehicle.create({
        data: {
          shipmentId: id,
          vehicleId: vehicleId,
        },
      });

      return shipmentVehicle;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeVehicle(id: string) {
    try {
      const shipmentVehicle = await this.prisma.shipmentVehicle.delete({
        where: { id },
      });

      return shipmentVehicle;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    return await this.prisma.shipment.findMany({
      include: {
        driver: true,
        truck: true,
        customer: true,
        cart: true,
        vehicles: {
          include: {
            vehicle: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.shipment.findUnique({
      where: { id },
      include: {
        driver: true,
        truck: true,
        customer: true,
        cart: true,
        vehicles: {
          include: {
            vehicle: true,
          },
        },
      },
    });
  }

  async update(id: string, updateShipmentDto: UpdateShipmentDto) {
    const { driverId, truckId, customerId, cartId, vehicles, ...shipmentData } =
      updateShipmentDto;

    try {
      const shipment = await this.prisma.shipment.update({
        where: { id },
        data: {
          ...shipmentData,
          driver: {
            connect: { id: driverId },
          },
          truck: {
            connect: { id: truckId },
          },
          customer: {
            connect: { id: customerId },
          },
          cart: {
            connect: { id: cartId },
          },
        },
      });
      return shipment;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string) {
    return await this.prisma.shipment.delete({
      where: { id },
    });
  }
}
