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
import { TrucksService } from './trucks.service';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { Public } from 'src/auth/public.decorator';

@Public()
@Controller('trucks')
export class TrucksController {
  constructor(private readonly trucksService: TrucksService) {}

  @Post('create')
  create(@Body() createTruckDto: CreateTruckDto) {
    return this.trucksService.create(createTruckDto);
  }

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<{ data: any[]; total: number }> {
    const trucks = await this.trucksService.findAll(+page, +limit);
    return trucks;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trucksService.findOne(id);
  }

  @Get('search')
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
  update(@Param('id') id: string, @Body() updateTruckDto: UpdateTruckDto) {
    return this.trucksService.update(id, updateTruckDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trucksService.remove(id);
  }
}
