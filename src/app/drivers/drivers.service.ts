import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DriversService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDriverDto: CreateDriverDto) {
    const status = createDriverDto.status;

    if (status !== true && status !== false && status !== null) {
      createDriverDto.status = false;
    }

    const isCpfCnpjExists = await this.prisma.driver.findUnique({
      where: {
        cpf: createDriverDto.cpf || createDriverDto.cnpj,
      },
    });

    if (isCpfCnpjExists) {
      throw new Error('CPF/CNPJ already exists');
    }

    const data: Prisma.DriverCreateInput = {
      ...createDriverDto,
    };

    const createdDriver = await this.prisma.driver.create({ data });

    return {
      ...createdDriver,
    };
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: any[]; total: number; pages: number, currentPage: number, perPage: number }> {
    const skip = (page - 1) * limit;
    const take = limit;
    const drivers = await this.prisma.driver.findMany({
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? 5 : take,
    });
    const total = await this.prisma.driver.count();
    const pages = Math.ceil(total / (take ? take : 5));
    return { data: drivers, total: total, pages: pages, currentPage: page, perPage: limit };
  }

  async findOne(id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    return await this.prisma.driver.findUnique({ where: { id } });
  }

  async searchDrivers(search: string) {
    const drivers = await this.prisma.driver.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { cpf: { contains: search, mode: 'insensitive' } },
          { cnpj: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
        ],
      },
    });
    return drivers;
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    return await this.prisma.driver.update({
      where: { id },
      data: updateDriverDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.driver.delete({ where: { id } });
  }
}
