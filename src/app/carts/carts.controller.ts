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

  @Get('search/:search')
  @ApiOperation({ summary: 'Find owner by cpf, cnpj, email or name' })
  @ApiQuery({ name: 'license_plate', required: false, type: String })
  @ApiQuery({ name: 'chassis', required: false, type: String })
  @ApiQuery({ name: 'renavam', required: false, type: String })
  @ApiQuery({ name: 'model', required: false, type: String })
  @ApiResponse({ status: 200, description: 'The found record', type: Cart })
  async searchCart(@Param('search') search: string): Promise<Cart[]> {
    const carts = await this.cartsService.searchCarts(search);
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
