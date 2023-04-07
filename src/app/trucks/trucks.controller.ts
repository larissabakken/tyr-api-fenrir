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
  ApiParam,
} from '@nestjs/swagger';
import { TrucksService } from './trucks.service';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { Public } from 'src/auth/public.decorator';
import { Truck } from './entities/truck.entity';

@Public()
@ApiTags('trucks')
@Controller('trucks')
export class TrucksController {
  constructor(private readonly trucksService: TrucksService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create truck' })
  @ApiBody({
    type: Truck,
    examples: { 'application/json': {} },
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The created record',
    type: Truck,
  })
  create(@Body() createTruckDto: CreateTruckDto) {
    return this.trucksService.create(createTruckDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all trucks' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit number',
  })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: Truck,
  })
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<{ data: any[]; total: number, pages: number }>  {
    const trucks = await this.trucksService.findAll(+page, +limit);
    return trucks;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find truck by id' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Truck id',
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Truck,
  })
  findOne(@Param('id') id: string) {
    return this.trucksService.findOne(id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Find truck by value' })
  @ApiQuery({
    name: 'license_plate',
    required: false,
    type: String,
    description: 'Truck license plate',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: Boolean,
    description: 'Truck status',
  })
  @ApiQuery({
    name: 'number_of_axles',
    required: false,
    type: Number,
    description: 'Truck number of axles',
  })
  async findAllByValue(
    @Query('license_plate') license_plate: string,
    @Query('status') status: boolean,
    @Query('number_of_axles') number_of_axles: number,
  ) {
    const trucks = await this.trucksService.findAllByValue(
      license_plate,
      status,
      number_of_axles,
    );
    return trucks;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update truck by id' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Truck id',
  })
  @ApiBody({
    type: Truck,
    examples: { 'application/json': {} },
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The updated record',
    type: Truck,
  })
  update(@Param('id') id: string, @Body() updateTruckDto: UpdateTruckDto) {
    return this.trucksService.update(id, updateTruckDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trucksService.remove(id);
  }
}
