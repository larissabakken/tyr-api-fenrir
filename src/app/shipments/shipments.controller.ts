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
  ApiParam,
} from '@nestjs/swagger';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { Shipment } from './entities/shipment.entity';

@ApiTags('shipments')
@ApiBearerAuth()
@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create shipment' })
  @ApiBody({
    type: Shipment,
    examples: { 'application/json': {} },
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The created record',
    type: Shipment,
  })
  create(@Body() createShipmentDto: CreateShipmentDto) {
    return this.shipmentsService.create(createShipmentDto);
  }

  @Get(':id/vehicle/:vehicleId')
  @ApiOperation({ summary: 'Add vehicle to shipment' })
  @ApiParam({
    name: 'id',
    description: "Shipment's Id",
    required: true,
    type: String,
  })
  @ApiParam({
    name: 'vehicleId',
    description: "Vehicle's Id",
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The updated record',
  })
  addVehicle(@Param('id') id: string, @Param('vehicleId') vehicleId: string) {
    return this.shipmentsService.addVehicle(id, vehicleId);
  }

  @Get()
  @ApiOperation({ summary: 'Find all shipments' })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: Shipment,
  })
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<{
    data: any[];
    total: number;
    pages: number;
    currentPage: number;
    perPage: number;
  }> {
    return this.shipmentsService.findAll(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one shipment' })
  @ApiParam({
    name: 'id',
    description: "Shipment's Id",
    required: true,
    type: String,
  })
  findOne(@Param('id') id: string) {
    return this.shipmentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update shipment' })
  @ApiParam({
    name: 'id',
    description: "Shipment's Id",
    required: true,
    type: String,
  })
  @ApiBody({
    type: Shipment,
    examples: { 'application/json': {} },
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The updated record',
    type: Shipment,
  })
  update(
    @Param('id') id: string,
    @Body() updateShipmentDto: UpdateShipmentDto,
  ) {
    return this.shipmentsService.update(id, updateShipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipmentsService.remove(id);
  }

  @Get(':id/vehicle/:vehicleId')
  @ApiOperation({ summary: 'Delete vehicle to shipment' })
  @ApiParam({
    name: 'id',
    description: "Shipment's Id",
    required: true,
    type: String,
  })
  @ApiParam({
    name: 'vehicleId',
    description: "Vehicle's Id",
    required: true,
    type: String,
  })
  deleteVehicle(@Param('id') id: string, @Param('vehicleId') vehicleId: string) {
    return this.shipmentsService.removeVehicle(id, vehicleId);
  }
}
