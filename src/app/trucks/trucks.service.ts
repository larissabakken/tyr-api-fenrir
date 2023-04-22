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

    return { data: truck, owner: owner };
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: any[]; total: number; pages: number }> {
    const skip = (page - 1) * limit;
    const take = limit;
    const trucks = await this.prisma.truck.findMany({
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? 5 : take,
      include: { owner: true },
    });
    const total = await this.prisma.truck.count();
    const pages = Math.ceil(total / (take ? take : 5));
    return { data: trucks, total: total, pages: pages };
  }

  async findOne(id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    return await this.prisma.truck.findUnique({
      where: { id },
      include: { owner: true },
    });
  }

  async searchTrucks(search: string) {
    const vehicles = await this.prisma.truck.findMany({
      where: {
        OR: [
          { license_plate: { contains: search, mode: 'insensitive' } },
          { chassis: { contains: search, mode: 'insensitive' } },
          { renavam: { contains: search, mode: 'insensitive' } },
          { model: { contains: search, mode: 'insensitive' } },
          { color: { contains: search, mode: 'insensitive' } },
        ],
      }
    });
    return vehicles;
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
