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

  async findAll(page: number, limit: number) : Promise<{
    data: any[];
    total: number;
    pages: number;
    currentPage: number;
    perPage: number;
  }> {
    const skip = (page - 1) * limit;
    const take = limit;
    const shipments = await this.prisma.shipment.findMany({
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? 5 : take,
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
    const total = await this.prisma.shipment.count();
    const pages = Math.ceil(total / (take > 0 ? take : 5));
    return {
      data: shipments,
      total: total,
      pages: pages,
      currentPage: page,
      perPage: limit,
    };
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
