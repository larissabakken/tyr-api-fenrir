import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Shipment } from '@prisma/client';

@Injectable()
export class ShipmentsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    const { driverId, truckId, customerId, vehicles, carts, ...rest } = createShipmentDto;

    const shipment = await this.prisma.shipment.create({
      data: {
        ...rest,
        driver: driverId ? { connect: { id: driverId } } : undefined,
        truck: truckId ? { connect: { id: truckId } } : undefined,
        customer: customerId ? { connect: { id: customerId } } : undefined,
        vehicles: vehicles,
        carts: carts,
      },
    });

    const data: Prisma.ShipmentCreateInput = {
      ...createShipmentDto,
    };

    const createdShipment = await this.prisma.shipment.create({ data });

    return { ...createdShipment, ...shipment };
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: any[]; total: number }> {
    const skip = (page - 1) * limit;
    const take = limit;
    const shipments = await this.prisma.shipment.findMany({
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? 2 : take,
      include: {
        driver: true,
        truck: true,
        customer: true,
        vehicles: true,
        carts: true,
      },
    });
    const total = await this.prisma.shipment.count();
    return { data: shipments, total };
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
        vehicles: true,
        carts: true,
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
