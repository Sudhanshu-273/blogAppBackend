import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const cookie = request.cookies['jwt'];
        const authHeader = request.headers['authorization'];
        // throw new UnauthorizedException('No authorization header found');
        if (!authHeader) {
            const cookie = request.cookies['jwt'];
            if (!cookie) {
                throw new UnauthorizedException('No user found');
            }

            try {
                const user = await this.jwtService.verifyAsync(cookie);

                if (!user) {
                    throw new UnauthorizedException('JWT token is invalid');
                }

                request.user = user;

                return true;
            } catch (error) {
                throw new UnauthorizedException(
                    'JWT token is invalid. Error : ',
                    error,
                );
            }
        }

        const tokenMatch = authHeader.match(/^Bearer (.+)$/);

        if (!tokenMatch) {
            throw new UnauthorizedException('Invalid token format');
        }

        const token = tokenMatch[1];

        try {
            const user = await this.jwtService.verifyAsync(token);

            if (!user) {
                throw new UnauthorizedException('JWT token is invalid');
            }

            request.user = user;

            return true;
        } catch (error) {
            throw new UnauthorizedException(
                'JWT token is invalid. Error: ' + error.message,
            );
        }
    }
}
