import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VehiclesService {
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

    return { data: vehicle, owner: owner };
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: any[]; total: number; pages: number }> {
    const skip = (page - 1) * limit;
    const take = limit;
    const vehicles = await this.prisma.vehicle.findMany({
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? 5 : take,
      include: { owner: true },
    });
    const total = await this.prisma.vehicle.count();
    const pages = Math.ceil(total / (take > 0 ? take : 5));
    return { data: vehicles, total, pages };
  }

  async findOne(id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    return await this.prisma.vehicle.findUnique({
      where: { id },
      include: { owner: true },
    });
  }

  async searchVehicles(search: string) {
    const vehicles = await this.prisma.vehicle.findMany({
      where: {
        OR: [
          { license_plate: { contains: search, mode: 'insensitive' } },
          { chassis: { contains: search, mode: 'insensitive' } },
          { renavam: { contains: search, mode: 'insensitive' } },
          { model: { contains: search, mode: 'insensitive' } },
          { origin: { contains: search, mode: 'insensitive' } },
          { color: { contains: search, mode: 'insensitive' } },
        ],
      }
    });
    return vehicles;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    return await this.prisma.vehicle.update({
      where: { id },
      data: updateVehicleDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.vehicle.delete({ where: { id } });
  }
}
