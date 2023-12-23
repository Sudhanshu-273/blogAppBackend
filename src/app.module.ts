import { Module } from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [SequelizeModule.forRoot({
    ...databaseConfig['development']
  }), UserModule, AuthModule, PostsModule, ProfileModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
