import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { LikeRepositoryModule } from '../repository/like/like.repository.module';

@Module({
  imports: [LikeRepositoryModule],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
