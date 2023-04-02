import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Public } from 'src/auth/public.decorator';

@Public()
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('create')
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<{ data: any[]; total: number }> {
    const carts = await this.cartsService.findAll(+page, +limit);
    return carts;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(id);
  }

  @Get('search')
  async findAllByValue(
    @Query('license_plate') license_plate: string,
    @Query('status') status: boolean,
    @Query('number_of_axles') number_of_axles: number,
  ) {
    const carts = await this.cartsService.findAllByValue(
      license_plate,
      status,
      number_of_axles,
    );
    return carts;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }
}
