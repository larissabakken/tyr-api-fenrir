import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto) {
    const { ownerId, ...vehicleData } = createVehicleDto;

    const owner = await this.prisma.owner.findUnique({
      where: { id: ownerId },
    });

    if (!owner) {
      throw new Error('Owner not found');
    }

    const vehicle = await this.prisma.vehicle.create({
      data: {
        ...vehicleData,
        owner: {
          connect: { id: ownerId },
        },
      },
    });
    return vehicle;
  }

  async findAll() {
    return await this.prisma.vehicle.findMany();
  }

  async findOne(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
    });
    return vehicle;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    const { ownerId, ...vehicleData } = updateVehicleDto;

    const owner = await this.prisma.owner.findUnique({
      where: { id: ownerId },
    });

    if (!owner) {
      throw new Error('Owner not found');
    }

    const vehicle = await this.prisma.vehicle.update({
      where: { id },
      data: {
        ...vehicleData,
        owner: {
          connect: { id: ownerId },
        },
      },
    });
    return vehicle;
  }

  async remove(id: string) {
    const vehicle = await this.prisma.vehicle.delete({
      where: { id },
    });
    return vehicle;
  }
}
