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

    return { data: cart, owner: owner };
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: any[]; total: number; pages: number, currentPage: number; perPage: number }> {
    const skip = (page - 1) * limit;
    const take = limit;
    const carts = await this.prisma.cart.findMany({
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? 5 : take,
      include: { owner: true },
    });
    const total = await this.prisma.cart.count();
    const pages = Math.ceil(total / (take > 0 ? limit : 5));
    return { data: carts, total: total, pages: pages, currentPage: page, perPage: limit };
  }

  async findOne(id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    return this.prisma.cart.findUnique({ where: { id } });
  }

  async searchCarts(search: string) {
    const carts = await this.prisma.cart.findMany({
      where: {
        OR: [
          { license_plate: { contains: search, mode: 'insensitive' } },
          { chassis: { contains: search, mode: 'insensitive' } },
          { renavam: { contains: search, mode: 'insensitive' } },
          { model: { contains: search, mode: 'insensitive' } },
        ],
      }
    });
    return carts;
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
