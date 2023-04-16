import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOwnerDto: CreateOwnerDto) {
    const isCpfCnpjExists = await this.prisma.driver.findUnique({
      where: {
        cpf: createOwnerDto.cpf || createOwnerDto.cnpj,
      },
    });

    if (isCpfCnpjExists) {
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

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: any[]; total: number; pages: number }> {
    const skip = (page - 1) * limit;
    const take = limit;
    const owners = await this.prisma.owner.findMany({
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? 2 : take,
    });
    const total = await this.prisma.owner.count();
    const pages = Math.ceil(total / (limit > 0 ? limit : 5));
    return { data: owners, total, pages };
  }

  async findOne(id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    return await this.prisma.owner.findUnique({ where: { id } });
  }

  async searchOwners(search: string) {
    const owners = await this.prisma.owner.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { cpf: { contains: search, mode: 'insensitive' } },
          { cnpj: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
        ],
      }
    });
    return owners;
  }

  async update(id: string, updateOwnerDto: UpdateOwnerDto) {
    return await this.prisma.owner.update({
      where: { id },
      data: updateOwnerDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.owner.delete({ where: { id } });
  }
}
