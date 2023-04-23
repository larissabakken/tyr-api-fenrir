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
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@ApiTags('vehicles')
@ApiBearerAuth()
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create vehicle' })
  @ApiBody({
    type: Vehicle,
    examples: { 'application/json': {} },
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The created record',
    type: Vehicle,
  })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all vehicles' })
  @ApiQuery({ name: 'page', required: true, type: Number })
  @ApiQuery({ name: 'limit', required: true, type: Number })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: Vehicle,
  })
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<{ data: any[]; total: number, pages: number }>  {
    const vehicles = await this.vehiclesService.findAll(+page, +limit);
    return vehicles;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find vehicle by id' })
  @ApiParam({ name: 'id', required: true, type: String })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Vehicle,
  })
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Get('search/:search')
  @ApiOperation({ summary: 'Find owner by cpf, cnpj, email or name' })
  @ApiQuery({ name: 'license_plate', required: false, type: String })
  @ApiQuery({ name: 'chassis', required: false, type: String })
  @ApiQuery({ name: 'renavam', required: false, type: String })
  @ApiQuery({ name: 'model', required: false, type: String })
  @ApiResponse({ status: 200, description: 'The found record', type: Vehicle })
  async searchVehicle(@Param('search') search: string): Promise<Vehicle[]> {
    const vehicles = await this.vehiclesService.searchVehicles(search);
    return vehicles;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update vehicle by id' })
  @ApiParam({ name: 'id', required: true, type: String })
  @ApiBody({
    type: Vehicle,
    examples: { 'application/json': {} },
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The updated record',
    type: Vehicle,
  })
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete vehicle by id' })
  @ApiParam({ name: 'id', required: true, type: String })
  @ApiResponse({
    status: 200,
    description: 'The deleted record',
    type: Vehicle,
  })
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }
}
