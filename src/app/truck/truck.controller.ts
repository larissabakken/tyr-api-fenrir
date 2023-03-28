import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TruckService } from './truck.service';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { Public } from 'src/auth/public.decorator';

@Public() // This decorator is used to allow access to this controller without authentication
@Controller('truck')
export class TruckController {
  constructor(private readonly truckService: TruckService) {}

  @Post('create')
  create(@Body() createTruckDto: CreateTruckDto) {
    return this.truckService.create(createTruckDto);
  }

  @Get()
  findAll() {
    return this.truckService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.truckService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTruckDto: UpdateTruckDto) {
    return this.truckService.update(id, updateTruckDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.truckService.remove(id);
  }
}
