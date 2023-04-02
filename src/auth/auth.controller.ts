import { Controller, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginRequestBody } from './model/LoginRequestBody';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post()
  @ApiOperation({ summary: 'Public route login' })
  @ApiBody({
    type: LoginRequestBody,
    examples: { 'application/json': {} },
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: LoginRequestBody,
  })
  @HttpCode(HttpStatus.OK)
  login(@Body() { email, password }: LoginRequestBody) {
    return this.authService.login(email, password);
  }
}
