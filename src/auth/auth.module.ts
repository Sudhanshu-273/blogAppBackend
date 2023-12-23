import {Module} from '@nestjs/common';
import {AuthController} from './controllers/auth/auth.controller';
import {AuthService} from './services/auth/auth.service';
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [JwtModule.register({
        secret: 'secret',
        signOptions: {expiresIn: '30d'}
    })],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {
}
