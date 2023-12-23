import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../../../auth/dtos/jwt-auth-guard";
import {ApiTags} from "@nestjs/swagger";
import {ProfileService} from "../../services/profile/profile.service";
import {Request} from "express";
import {UpdateProfileDto} from "../../dtos/updateProfile.dto";

@ApiTags('Profile')
@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {
    }

    @Post('update')
    updateProfile(@Req() req: Request, @Body() body: UpdateProfileDto) {
        return this.profileService.updateProfile(body, req.user['id'])
    }

    @Get('completed')
    is_completed(@Req() req: Request) {
        return this.profileService.is_completed(req.user['id'])
    }

    @Get('view')
    view(@Req() req: Request) {
        return this.profileService.view(req.user['id'])
    }
}
