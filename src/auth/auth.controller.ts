import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  AuthSignupDto } from './dto/auth-signup.dto';
import { AuthSigninDto } from './dto/auth-signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(@Body() signupDto: AuthSignupDto) {
        return this.authService.signup(signupDto);
    }

    @Post('signin')
    async signin(@Body() signinDto: AuthSigninDto) {
        console.log('Signin DTO:', signinDto);
        return this.authService.signin(signinDto);
    }
}
