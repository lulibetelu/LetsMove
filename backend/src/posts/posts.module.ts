import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepositoryModule } from '../repository/posts/posts.repository.module';

@Module({
  imports: [PostsRepositoryModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
