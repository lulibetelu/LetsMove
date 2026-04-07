import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterModule } from './register/register.module';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './login/login.module';
import { AuthModule } from './authentication/auth.module';
import { PreferencesModule } from './preferences/preferences.module';
import { PostsModule } from './posts/posts.module';
import { SportsModule } from './sports/sports.module';
import { DislikeModule } from './dislike/dislike.module';

@Module({
  imports: [
    RegisterModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoginModule,
    AuthModule,
    PreferencesModule,
    PostsModule,
    SportsModule,
    DislikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
