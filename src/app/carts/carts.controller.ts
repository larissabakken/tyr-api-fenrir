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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Public } from 'src/auth/public.decorator';
import { Cart } from './entities/cart.entity';

@Public()
@ApiTags('carts')
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create cart' })
  @ApiBody({
    type: Cart,
    examples: { 'application/json': {} },
    required: true,
  })
  @ApiResponse({ status: 200, description: 'The created record', type: Cart })
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all carts' })
  @ApiResponse({ status: 200, description: 'The found records', type: Cart })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<{ data: any[]; total: number; pages: number }> {
    const carts = await this.cartsService.findAll(+page, +limit);
    return carts;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find cart by id' })
  @ApiResponse({ status: 200, description: 'The found record', type: Cart })
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Find carts by value' })
  @ApiQuery({ name: 'license_plate', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: Boolean })
  @ApiQuery({ name: 'number_of_axles', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'The found records', type: Cart })
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
  @ApiOperation({ summary: 'Update cart by id' })
  @ApiBody({
    type: Cart,
    examples: { 'application/json': {} },
    required: false,
  })
  @ApiResponse({ status: 200, description: 'The updated record', type: Cart })
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(id, updateCartDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete cart by id' })
  @ApiResponse({ status: 200, description: 'The deleted record' })
  remove(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }
}
