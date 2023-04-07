import { Injectable } from '@nestjs/common';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrucksService {
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

    return {data: truck, owner: owner};
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: any[]; total: number }> {
    const skip = (page - 1) * limit;
    const take = limit;
    const trucks = await this.prisma.truck.findMany({
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? 2 : take,
      include: { owner: true },
    });
    const total = await this.prisma.truck.count();
    return { data: trucks, total };
  }

  async findOne(id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    return await this.prisma.truck.findUnique({ where: { id }, include: { owner: true } });
  }

  async findAllByValue(
    license_plate: string,
    status: boolean,
    number_of_axles: number,
  ) {
    if (!license_plate && !status && !number_of_axles) {
      throw new Error('LICENSE_PLATE, STATUS or NUMBER_OF_AXLES is required');
    }
    return await this.prisma.truck.findMany({
      where: { license_plate, status, number_of_axles },
    });
  }

  async update(id: string, updateTruckDto: UpdateTruckDto) {
    return await this.prisma.truck.update({
      where: { id },
      data: updateTruckDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.truck.delete({ where: { id } });
  }
}
