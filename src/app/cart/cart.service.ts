import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCartDto: CreateCartDto) {
    const status = createCartDto.status;
    const { ownerId, ...cartData } = createCartDto;

    if (status !== true && status !== false && status !== null) {
      createCartDto.status = false;
    }

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
    return cart;
  }

  async findAll() {
    return await this.prisma.cart.findMany();
  }

  async findOne(id: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { id },
    });
    return cart;
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const { ownerId, ...cartData } = updateCartDto;

    const owner = await this.prisma.owner.findUnique({
      where: { id: ownerId },
    });

    if (!owner) {
      throw new Error('Owner not found');
    }

    const cart = await this.prisma.cart.update({
      where: { id },
      data: {
        ...cartData,
        owner: {
          connect: { id: ownerId },
        },
      },
    });
    return cart;
  }

  async remove(id: string) {
    const cart = await this.prisma.cart.delete({
      where: { id },
    });
    return cart;
  }
}
