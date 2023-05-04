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
          date_finalized: shipmentData.date_finalized
            ? new Date(shipmentData.date_finalized)
            : null,
          date_initiated: shipmentData.date_initiated
            ? new Date(shipmentData.date_initiated)
            : null,
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
      if (!(await this.prisma.shipment.findUnique({ where: { id } })))
        throw new Error('Shipment not found');

      if (!(await this.prisma.vehicle.findUnique({ where: { id: vehicleId } })))
        throw new Error('Vehicle not found');

      if (
        await this.prisma.shipmentVehicle.findFirst({
          where: { shipmentId: id, vehicleId: vehicleId },
        })
      )
        throw new Error('Vehicle already added');
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

  async removeVehicle(id: string, vehicleId: string) {
    try {
      return await this.prisma.shipmentVehicle.deleteMany({
        where: {
          shipmentId: id,
          vehicleId: vehicleId,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
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
          date_finalized: shipmentData.date_finalized
            ? new Date(shipmentData.date_finalized)
            : shipmentData.date_finalized,
          date_initiated: shipmentData.date_initiated
            ? new Date(shipmentData.date_initiated)
            : shipmentData.date_finalized,
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
