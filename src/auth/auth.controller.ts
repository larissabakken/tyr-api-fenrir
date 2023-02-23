import { Controller, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginRequestBody } from './model/LoginRequestBody';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor( private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() { email, password } : LoginRequestBody) {
        return this.authService.login( email, password );
    }
}
