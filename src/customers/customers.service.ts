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

  async findAll() {
    return await this.prisma.customers.findMany();
  }

  async findOne(id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
   return await this.prisma.customers.findUnique({ where: { id } });
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
