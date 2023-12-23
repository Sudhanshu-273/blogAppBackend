import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/dtos/jwt-auth-guard";
import {JwtService} from "@nestjs/jwt";
import {Request} from "express";

@Controller('user')
@ApiTags('User')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService,
                private jwtService: JwtService
    ) {
    }

    @Get('id')
    async getUserById( @Req() req: Request) {

        return this.userService.getUserById(req.user['id'])
    }

}
