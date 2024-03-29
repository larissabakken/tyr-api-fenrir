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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create customer' })
  @ApiBody({
    type: Customer,
    examples: { 'application/json': {} },
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The created record',
    type: Customer,
  })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all customers' })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: Customer,
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
    const customers = await this.customersService.findAll(+page, +limit);
    return customers;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find customer by id' })
  @ApiParam({
    name: 'id',
    description: 'Customer id',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Customer,
  })
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Get('search/:search')
  @ApiOperation({ summary: 'Find owner by cpf, cnpj, email or name' })
  @ApiQuery({ name: 'cpf', required: false, type: String })
  @ApiQuery({ name: 'cnpj', required: false, type: String })
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiResponse({ status: 200, description: 'The found record', type: Customer })
  async searchCustomer(@Param('search') search: string): Promise<Customer[]> {
    const drivers = await this.customersService.searchCustomers(search);
    return drivers;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update customer by id' })
  @ApiParam({
    name: 'id',
    description: 'Customer id',
    type: String,
  })
  @ApiBody({
    type: Customer,
    examples: { 'application/json': {} },
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The updated record',
    type: Customer,
  })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete customer by id' })
  @ApiParam({
    name: 'id',
    description: 'Customer id',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The deleted record',
  })
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
