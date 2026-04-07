import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepositoryModule } from '../repository/posts/posts.repository.module';
import { LikeModule } from '../like/like.module';

@Module({
  imports: [PostsRepositoryModule, LikeModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
