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
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Public } from 'src/auth/public.decorator';

@Public() // This decorator is used to allow access to this controller without authentication
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post('/create')
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<{ data: any[]; total: number }> {
    const drivers = await this.driverService.findAll(+page, +limit);
    return drivers;
  }

  @Get('id/:id')
  findById(@Param('id') id: string) {
    return this.driverService.findById(id);
  }

  @Get(':value')
  findOne(@Param('value') value: string) {
    return this.driverService.findOne(value);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(id);
  }
}
