import { Injectable } from '@nestjs/common';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TruckService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTruckDto: CreateTruckDto) {
    const { ownerId, ...truckData } = createTruckDto;

    const owner = await this.prisma.owner.findUnique({
      where: { id: ownerId },
    });

    if (!owner) {
      throw new Error('Owner not found');
    }

    const truck = await this.prisma.truck.create({
      data: {
        ...truckData,
        owner: {
          connect: { id: ownerId },
        },
      },
    });
    return truck;
  }

  async findAll() {
    return this.prisma.truck.findMany();
  }

  async findOne(id: string) {
    const truck = await this.prisma.truck.findUnique({
      where: { id },
    });
    return truck;
  }

  async update(id: string, updateTruckDto: UpdateTruckDto) {
    const { ownerId, ...truckData } = updateTruckDto;

    const owner = await this.prisma.owner.findUnique({
      where: { id: ownerId },
    });

    if (!owner) {
      throw new Error('Owner not found');
    }

    const truck = await this.prisma.truck.update({
      where: { id },
      data: {
        ...truckData,
        owner: {
          connect: { id: ownerId },
        },
      },
    });

    return truck;
  }

  async remove(id: string) {
    const truck = await this.prisma.truck.delete({
      where: { id },
    });

    return truck;
  }
}
