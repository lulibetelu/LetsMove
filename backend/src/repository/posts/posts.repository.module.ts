import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PostsRepositoryService } from './posts.repository.service';

@Module({
  imports: [PrismaModule],
  providers: [PostsRepositoryService],
  exports: [PostsRepositoryService],
})
export class PostsRepositoryModule {}
