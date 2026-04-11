import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { LikeRepositoryModule } from '../repository/like/like.repository.module';
import { DislikeModule } from '../dislike/dislike.module';

@Module({
  imports: [LikeRepositoryModule, DislikeModule],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
