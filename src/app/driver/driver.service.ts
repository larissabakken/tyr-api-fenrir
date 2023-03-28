import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DriverService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDriverDto: CreateDriverDto) {
    const status = createDriverDto.status;

    if (status !== true && status !== false && status !== null) {
      createDriverDto.status = false;
    }

    const isCpfCnpjExists = await this.prisma.driver.findUnique({
      where: {
        cpf_cnpj: createDriverDto.cpf_cnpj,
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
  ): Promise<{ data: any[]; total: number }> {
    const skip = (page - 1) * limit;
    const take = limit;
    const customers = await this.prisma.driver.findMany({
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? 2 : take,
    });
    const total = await this.prisma.driver.count();
    return { data: customers, total };
  }

  async findById(id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    return await this.prisma.driver.findUnique({ where: { id } });
  }

  async findOne(value: string) {
    if (!value) {
      throw new Error('Value is required');
    }
    let driver: any;
    switch (true) {
      case value.includes('@'): // assume it's an email
        driver = await this.prisma.driver.findUnique({
          where: { email: value },
        });
        break;
      default: // assume it's cpf_cnpj
        driver = await this.prisma.driver.findUnique({
          where: { cpf_cnpj: value },
        });
        break;
    }
    return driver;
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
