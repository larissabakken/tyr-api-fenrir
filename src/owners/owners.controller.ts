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
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Public } from 'src/auth/public.decorator';

@Public() // This decorator is used to allow access to this controller without authentication
@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post('/create')
  create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownersService.create(createOwnerDto);
  }

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<{ data: any[]; total: number }> {
    const owners = await this.ownersService.findAll(+page, +limit);
    return owners;
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.ownersService.findById(id);
  }

  @Get('')
  async findAllByValue(
    @Query('cpf') cpf: string,
    @Query('cnpj') cnpj: string,
    @Query('email') email: string,
    @Query('name') name: string,
  ) {
    const owners = await this.ownersService.findAllByValue(
      cpf,
      cnpj,
      email,
      name,
    );
    return owners;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownersService.update(id, updateOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownersService.remove(id);
  }
}
