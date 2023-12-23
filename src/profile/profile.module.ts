import { Module } from '@nestjs/common';
import { ProfileController } from './controllers/profile/profile.controller';
import { ProfileService } from './services/profile/profile.service';
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [JwtModule.register({
    secret: 'secret',
    signOptions: {expiresIn: '30d'}
  })],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
