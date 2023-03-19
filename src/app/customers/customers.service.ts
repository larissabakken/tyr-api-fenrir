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
        cpf_cnpj: createCustomerDto.cpf_cnpj,
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

  async countAll(): Promise<number> {
    const count = await this.prisma.customers.count();
    return count;
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

  async findById(id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    return await this.prisma.customers.findUnique({ where: { id } });
  }

  async findOne(value: string) {
    if (!value) {
      throw new Error('Value is required');
    }
    let customers: any;
    switch (true) {
      case value.includes('@'): // assume it's an email
        customers = await this.prisma.customers.findMany({
          where: { email: value },
        });
        break;
      default: // assume it's cpf_cnpj
        customers = await this.prisma.customers.findUnique({
          where: { cpf_cnpj: value },
        });
        break;
    }
    return customers;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return await this.prisma.customers.update({
      where: {
        id: id,
      },
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
