import {Module} from '@nestjs/common';
import {PostsController} from './controllers/posts/posts.controller';
import {PostsService} from './services/posts/posts.service';
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [JwtModule.register({
        secret: 'secret',
        signOptions: {expiresIn: '30d'}
    })],
    controllers: [PostsController],
    providers: [PostsService]
})
export class PostsModule {
}
