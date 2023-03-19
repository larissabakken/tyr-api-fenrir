import { Injectable } from '@nestjs/common';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { OwnerService } from '../owner/owner.service';


@Injectable()
export class TruckService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ownerService: OwnerService,
  ) {}

  async create(createTruckDto: CreateTruckDto) {
    const { ownerId, ...rest } = createTruckDto;

    // Retrieve owner from database to ensure it exists
    const owner = await this.ownerService.findById(ownerId);

    // Create new truck with provided data and owner
    const newTruck = await this.prisma.truck.create({
      data: {
        ...rest,
        owner: {
          connect: { id: ownerId },
        },
      },
    });

    return newTruck;
  }

  async findAll() {
    return this.prisma.truck.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} truck`;
  }

  update(id: number, updateTruckDto: UpdateTruckDto) {
    return `This action updates a #${id} truck`;
  }

  remove(id: number) {
    return `This action removes a #${id} truck`;
  }
}
