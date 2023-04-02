import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCartDto: CreateCartDto) {
    const { ownerId, ...cartData } = createCartDto;

    const owner = await this.prisma.owner.findUnique({
      where: { id: ownerId },
    });

    if (!owner) {
      throw new Error('Owner not found');
    }

    const cart = await this.prisma.cart.create({
      data: {
        ...cartData,
        owner: {
          connect: { id: ownerId },
        },
      },
    });

    return { data: cart, owner };
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: any[]; total: number }> {
    const skip = (page - 1) * limit;
    const take = limit;
    const carts = await this.prisma.cart.findMany({
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? 2 : take,
    });
    const total = await this.prisma.cart.count();
    return { data: carts, total };
  }

  async findOne(id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    return this.prisma.cart.findUnique({ where: { id } });
  }

  async findAllByValue(
    license_plate: string,
    status: boolean,
    number_of_axles: number,
  ) {
    if (!license_plate && !status && !number_of_axles) {
      throw new Error('LICENSE_PLATE, STATUS or NUMBER_OF_AXLES is required');
    }
    return this.prisma.cart.findMany({
      where: { license_plate, status, number_of_axles },
    });
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    return await this.prisma.cart.update({
      where: { id },
      data: updateCartDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.cart.delete({ where: { id } });
  }
}
