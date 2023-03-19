import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Public } from 'src/auth/public.decorator';

@Public()
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post('/create')
  @UsePipes(new ValidationPipe())
  create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownerService.create(createOwnerDto);
  }

  @Get()
  findAll() {
    return this.ownerService.findAll();
  }

  @Get('id/:id')
  findById(@Param('id') id: string) {
    return this.ownerService.findById(id);
  }
  
  @Get(':value')
  findOne(@Param('value') value: string) {
    return this.ownerService.findOne(value);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownerService.update(id, updateOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownerService.remove(id);
  }
}
