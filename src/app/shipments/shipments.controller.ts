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
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { Public } from 'src/auth/public.decorator';
import { Shipment } from './entities/shipment.entity';

@Public() // This decorator is used to allow access to this controller without authentication
@ApiTags('shipments')
@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post('create')
  async create(@Body()createShipmentDto: CreateShipmentDto & { vehicles: { vehicleId: string }[], carts: { cartId: string }[] }): Promise<Shipment> {
    return this.shipmentsService.create(createShipmentDto);
  }

  @ApiOperation({ summary: 'Find all shipments' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: Shipment,
  })
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<{ data: any[]; total: number }> {
    const shipments = await this.shipmentsService.findAll(+page, +limit);
    return shipments;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find shipment by id' })
  @ApiParam({ name: 'id', required: true, type: String })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Shipment,
  })
  findOne(@Param('id') id: string) {
    return this.shipmentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update shipment by id' })
  @ApiParam({ name: 'id', required: true, type: String })
  @ApiBody({
    type: Shipment,
    examples: { 'application/json': {} },
    required: true,
  })
  update(
    @Param('id') id: string,
    @Body() updateShipmentDto: UpdateShipmentDto,
  ) {
    return this.shipmentsService.update(id, updateShipmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete shipment by id' })
  @ApiParam({ name: 'id', required: true, type: String })
  @ApiResponse({
    status: 200,
    description: 'The deleted record',
    type: Shipment,
  })
  remove(@Param('id') id: string) {
    return this.shipmentsService.remove(id);
  }
}
