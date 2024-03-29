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
} from '@nestjs/swagger';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';

@ApiTags('owners')
@ApiBearerAuth()
@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create owner' })
  @ApiBody({
    type: Owner,
    examples: { 'application/json': {} },
    required: true,
  })
  @ApiResponse({ status: 200, description: 'The created record', type: Owner })
  create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownersService.create(createOwnerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all owners' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'The found records', type: Owner })
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
    const owners = await this.ownersService.findAll(+page, +limit);
    return owners;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find owner by id' })
  @ApiResponse({ status: 200, description: 'The found record', type: Owner })
  findOne(@Param('id') id: string) {
    return this.ownersService.findOne(id);
  }

  @Get('search/:search')
  @ApiOperation({ summary: 'Find owner by cpf, cnpj, email or name' })
  @ApiQuery({ name: 'cpf', required: false, type: String })
  @ApiQuery({ name: 'cnpj', required: false, type: String })
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiResponse({ status: 200, description: 'The found record', type: Owner })
  async searchOwner(@Param('search') search: string): Promise<Owner[]> {
    const owners = await this.ownersService.searchOwners(search);
    return owners;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update owner by id' })
  @ApiResponse({ status: 200, description: 'The updated record', type: Owner })
  @ApiBody({
    type: Owner,
    examples: { 'application/json': {} },
    required: false,
  })
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownersService.update(id, updateOwnerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete owner by id' })
  @ApiResponse({ status: 200, description: 'The deleted record' })
  remove(@Param('id') id: string) {
    return this.ownersService.remove(id);
  }
}
