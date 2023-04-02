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

    return { data: vehicle, owner };
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: any[]; total: number }> {
    const skip = (page - 1) * limit;
    const take = limit;
    const vehicles = await this.prisma.vehicle.findMany({
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? 2 : take,
    });
    const total = await this.prisma.vehicle.count();
    return { data: vehicles, total };
  }

  async findOne(id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    return await this.prisma.vehicle.findUnique({ where: { id } });
  }

  async findAllByValue(license_plate: string, origin: string) {
    if (!license_plate && !origin) {
      throw new Error('LICENSE_PLATE or ORIGIN is required');
    }
    return await this.prisma.vehicle.findMany({
      where: { license_plate, origin },
    });
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
