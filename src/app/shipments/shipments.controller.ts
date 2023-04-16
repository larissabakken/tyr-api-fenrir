import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { Public } from 'src/auth/public.decorator';

@Public()
@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post('create')
  create(@Body() createShipmentDto: CreateShipmentDto) {
    return this.shipmentsService.create(createShipmentDto);
  }

  @Get(':id/vehicle/:vehicleId')
  addVehicle(@Param('id') id: string, @Param('vehicleId') vehicleId: string) {
    return this.shipmentsService.addVehicle(id, vehicleId);
  }

  @Get(':id/cart/:cartId')
  addCart(@Param('id') id: string, @Param('idCart') cartId: string) {
    return this.shipmentsService.addCart(id, cartId);
  }

  @Get()
  findAll() {
    return this.shipmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentsService.findOne(id);
  }

  @Patch(':id')
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

  @Delete('vehicle/:id')
  removeVehicle(@Param('id') id: string) {
    return this.shipmentsService.removeVehicle(id);
  }

  @Delete('cart/:id')
  removeCart(@Param('id') id: string) {
    return this.shipmentsService.removeCart(id);
  }
  
}
