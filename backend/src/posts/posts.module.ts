import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepositoryModule } from '../repository/posts/posts.repository.module';
import { LikeModule } from '../like/like.module';
import { UserRepositoryModule } from '../repository/user/user.repository.module';

@Module({
  imports: [PostsRepositoryModule, LikeModule, UserRepositoryModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
