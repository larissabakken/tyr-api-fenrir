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
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Public } from 'src/auth/public.decorator';

@Public() // This decorator is used to allow access to this controller without authentication
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post('/create')
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driversService.create(createDriverDto);
  }

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<{ data: any[]; total: number }> {
    const drivers = await this.driversService.findAll(+page, +limit);
    return drivers;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(id);
  }

  @Get('search')
  async findAllByValue(
    @Query('cpf') cpf: string,
    @Query('cnpj') cnpj: string,
    @Query('email') email: string,
    @Query('name') name: string,
  ) {
    const drivers = await this.driversService.findAllByValue(
      cpf,
      cnpj,
      email,
      name,
    );
    return drivers;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driversService.remove(id);
  }
}
