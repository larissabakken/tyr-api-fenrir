import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOwnerDto: CreateOwnerDto) {
    const isCpfCnpjValid = await this.prisma.owner.findUnique({
      where: {
        cpf_cnpj: createOwnerDto.cpf_cnpj,
      },
    });

    if (isCpfCnpjValid) {
      throw new Error('CPF/CNPJ already exists');
    }

    const data: Prisma.OwnerCreateInput = {
      ...createOwnerDto,
    };

    const createdOwner = await this.prisma.owner.create({ data });

    return {
      ...createdOwner,
    };
  }

  async findAll() {
    return await this.prisma.owner.findMany();
  }

  async findById(id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    return await this.prisma.owner.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.prisma.owner.findUnique({ where: { email } });
  }

  async findByCpfCnpj(cpf_cnpj: string) {
    return await this.prisma.owner.findUnique({ where: { cpf_cnpj } });
  }

  async update(id: string, updateOwnerDto: UpdateOwnerDto) {
    return await this.prisma.owner.update({
      where: {
        id: id,
      },
      data: updateOwnerDto,
    });
  }

  async remove(id: string) {
   return await this.prisma.owner.delete({
      where: {
        id: id,
      },
    });
  }
}
