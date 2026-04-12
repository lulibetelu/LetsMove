import { forwardRef, Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { LikeRepositoryModule } from '../repository/like/like.repository.module';
import { PostActionValidatorModule } from '../post-action-validator/post-action-validator.module';

@Module({
  imports: [LikeRepositoryModule, forwardRef(() => PostActionValidatorModule)],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
