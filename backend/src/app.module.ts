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
import { LikeModule } from './like/like.module';
import { DislikeModule } from './dislike/dislike.module';
import { PostActionValidatorModule } from './post-action-validator/post-action-validator.module';
import { FriendsModule } from './friends/friends.module';
import { CommentModule } from './comment/comment.module';
import { EventModule } from './event/event.module';
import { EventSignUpModule } from './event-sign-up/event-sign-up.module';
import { EventEntryModule } from './eventEntry/event-entry.module';
import { ImageModule } from './images/image.module';
import { ChatGateway } from './chat/chat.gateway';
import { GroupModule } from './group/group.module';
import { MessageModule } from './message/message.module';

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
    LikeModule,
    DislikeModule,
    PostActionValidatorModule,
    FriendsModule,
    CommentModule,
    EventModule,
    EventSignUpModule,
    EventEntryModule,
    ImageModule,
    GroupModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
