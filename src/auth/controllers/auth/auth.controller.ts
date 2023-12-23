import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import {CreateUserDto} from "../../dtos";
import {AuthService} from "../../services/auth/auth.service";
import {LoginUserDto} from "../../dtos/loginUser.dto";
import {Response} from "express";
import {ApiTags} from "@nestjs/swagger";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Post('create-account')
    createAccount(@Body() userDetails: CreateUserDto) {
        return this.authService.createAccount(userDetails)
    }

    @Post('login')
    async loginUser(@Body() userDetails: LoginUserDto, @Res({passthrough: true}) res: Response) {
        const jwt = await this.authService.loginUser(userDetails)

        res.cookie('jwt', jwt, {httpOnly: true});

        return {
            status: true,
            message: 'logged in successfully',
            accessToken: jwt
        }
    }

    @Post('logout-user')
    logout(@Res({passthrough: true}) res: Response) {
        console.log('Logged out');
        res.clearCookie('jwt');
        return {status: true, message: 'Logged Out Successfully'};
    }

}
