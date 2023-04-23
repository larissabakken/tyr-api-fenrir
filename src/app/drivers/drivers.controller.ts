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
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';


@ApiTags('drivers')
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create driver' })
  @ApiBody({
    type: Driver,
    examples: { 'application/json': {} },
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The created record',
    type: Driver,
  })
  @ApiResponse({ status: 200, description: 'The created record', type: Driver })
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driversService.create(createDriverDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all drivers' })
  @ApiQuery({ name: 'page', required: true, type: Number })
  @ApiQuery({ name: 'limit', required: true, type: Number })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: Driver,
  })
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<{ data: any[]; total: number, pages: number }>  {
    const drivers = await this.driversService.findAll(+page, +limit);
    return drivers;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find driver by id' })
  @ApiParam({
    name: 'id',
    description: 'Customer id',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'The found record', type: Driver })
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(id);
  }

  @Get('search/:search')
  @ApiOperation({ summary: 'Find owner by cpf, cnpj, email or name' })
  @ApiQuery({ name: 'cpf', required: false, type: String })
  @ApiQuery({ name: 'cnpj', required: false, type: String })
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'status', required: true, type: Boolean })
  @ApiResponse({ status: 200, description: 'The found record', type: Driver })
  async searchDriver(@Param('search') search: string): Promise<Driver[]> {
    const drivers = await this.driversService.searchDrivers(search);
    return drivers;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update driver by id' })
  @ApiParam({
    name: 'id',
    description: 'Customer id',
    type: String,
  })
  @ApiBody({
    type: Driver,
    examples: { 'application/json': {} },
    required: true,
  })
  @ApiResponse({ status: 200, description: 'The updated record', type: Driver })
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete driver by id' })
  @ApiResponse({ status: 200, description: 'The deleted record', type: Driver })
  remove(@Param('id') id: string) {
    return this.driversService.remove(id);
  }
}
