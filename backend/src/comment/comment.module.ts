import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepositoryModule } from '../repository/comment/comment.repository.module';

@Module({
  imports: [CommentRepositoryModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
