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

  findOne(id: string) {
    return `This action returns a #${id} customer`;
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: string) {
    return `This action removes a #${id} customer`;
  }
}
