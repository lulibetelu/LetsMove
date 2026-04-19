import { Module } from '@nestjs/common';
import { CommentRepositoryService } from './comment.repository.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CommentRepositoryService],
  exports: [CommentRepositoryService],
})
export class CommentRepositoryModule {}
