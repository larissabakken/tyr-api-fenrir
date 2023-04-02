import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const isCpfCnpjExists = await this.prisma.customers.findUnique({
      where: {
        cpf: createCustomerDto.cpf || createCustomerDto.cnpj,
      },
    });

    if (isCpfCnpjExists) {
      throw new Error('CPF/CNPJ already exists');
    }

    const data: Prisma.CustomersCreateInput = {
      ...createCustomerDto,
    };

    const createdCustomer = await this.prisma.customers.create({ data });

    return {
      ...createdCustomer,
    };
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: any[]; total: number }> {
    const skip = (page - 1) * limit;
    const take = limit;
    const customers = await this.prisma.customers.findMany({
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? 2 : take,
    });
    const total = await this.prisma.customers.count();
    return { data: customers, total };
  }

  async findOne(id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    return await this.prisma.customers.findUnique({ where: { id } });
  }

  async findAllByValue(cpf: string, cnpj: string, email: string, name: string) {
    if (!cpf && !cnpj && !email && !name) {
      throw new Error('CPF, CNPJ, EMAIL or NAME is required');
    }
    return await this.prisma.customers.findMany({
      where: { cpf, cnpj, email, name },
    });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return await this.prisma.customers.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.customers.delete({
      where: {
        id: id,
      },
    });
  }
}
