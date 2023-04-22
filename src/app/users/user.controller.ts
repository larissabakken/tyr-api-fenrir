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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/public.decorator';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
@Public()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({
    type: User,
    examples: { 'application/json': {} },
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The created record',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all users' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: User,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get('search/:search')
  @ApiOperation({ summary: 'Find owner by cpf, cnpj, email or name' })
  @ApiQuery({ name: 'cpf', required: false, type: String })
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiResponse({ status: 200, description: 'The found record', type: User })
  async searchUser(@Param('search') search: string): Promise<User[]> {
    const users = await this.userService.searchUsers(search);
    return users;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one user' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'User id',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Find one user by value' })
  @ApiQuery({
    name: 'email',
    required: true,
    type: String,
    description: 'User email',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  async findOneByValue(@Query('email') email: string) {
    const user = await this.userService.findOneByValue(email);
    return user;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'User id',
  })
  @ApiBody({
    type: User,
    examples: { 'application/json': {} },
    required: true,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The updated record',
    type: User,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'User id',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The deleted record',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
