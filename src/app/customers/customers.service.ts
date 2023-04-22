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
  ): Promise<{ data: any[]; total: number; pages: number }> {
    const skip = (page - 1) * limit;
    const take = limit;
    const customers = await this.prisma.customers.findMany({
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? 5 : take,
    });
    const total = await this.prisma.customers.count();
    const pages = Math.ceil(total / (take > 0 ? take : 5));
    return { data: customers, total: total, pages: pages };
  }

  async findOne(id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    return await this.prisma.customers.findUnique({ where: { id } });
  }

  async searchCustomers(search: string) {
    const customers = await this.prisma.customers.findMany({
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
    return customers;
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
