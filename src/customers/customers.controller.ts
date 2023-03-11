import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Public } from 'src/auth/public.decorator';

@Public()	// This decorator is used to allow access to this controller without authentication
@Controller('customer')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('/create')
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get('id/:id')
  findById(@Param('id') id: string) {
    return this.customersService.findById(id);
  }
  
  @Get(':value')
  findOne(@Param('value') value: string) {
    return this.customersService.findOne(value);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
