import { Module } from '@nestjs/common';
import { DislikeService } from './dislike.service';
import { DislikeController } from './dislike.controller';
import { DislikeRepositoryModule } from '../repository/dislike/dislike.repository.module';

@Module({
  imports: [DislikeRepositoryModule],
  controllers: [DislikeController],
  providers: [DislikeService],
})
export class DislikeModule {}
