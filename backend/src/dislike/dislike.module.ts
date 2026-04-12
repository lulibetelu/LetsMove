import { forwardRef, Module } from '@nestjs/common';
import { DislikeService } from './dislike.service';
import { DislikeController } from './dislike.controller';
import { DislikeRepositoryModule } from '../repository/dislike/dislike.repository.module';
import { PostActionValidatorModule } from '../post-action-validator/post-action-validator.module';

@Module({
  imports: [
    DislikeRepositoryModule,
    forwardRef(() => PostActionValidatorModule),
  ],
  controllers: [DislikeController],
  providers: [DislikeService],
  exports: [DislikeService],
})
export class DislikeModule {}
