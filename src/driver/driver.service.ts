import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DriverService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDriverDto: CreateDriverDto) {
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

  async findAll() {
    return await this.prisma.driver.findMany();
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
      driver = await this.prisma.driver.findUnique({ where: { email: value } });
        break;
      default: // assume it's cpf_cnpj
      driver = await this.prisma.driver.findUnique({ where: { cpf_cnpj: value } });
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
