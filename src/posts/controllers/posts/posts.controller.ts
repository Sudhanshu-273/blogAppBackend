import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {PostsService} from '../../services/posts/posts.service';
import {Request} from 'express';
import {JwtAuthGuard} from 'src/auth/dtos/jwt-auth-guard';
import {ApiTags} from '@nestjs/swagger';
import {CreatePostDto} from "../../dtos/createPost.dto";

@ApiTags('Posts')
@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
    constructor(private readonly postsService: PostsService) {
    }

    @Get()
    async getPosts(@Req() req: Request) {
        return this.postsService.getPosts(req.user['id'])
    }

    @Get('all')
    async getAllPosts(@Req() req: Request) {
        return this.postsService.getAllPosts(req.user['id'])
    }

    @Post('new')
    async createPost(@Body() body: CreatePostDto, @Req() req: Request) {
        return this.postsService.createPost(body, req.user['id']);
    }


}
