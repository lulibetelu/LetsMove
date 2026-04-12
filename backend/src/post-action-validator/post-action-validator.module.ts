import { forwardRef, Module } from '@nestjs/common';
import { LikeModule } from '../like/like.module';
import { DislikeModule } from '../dislike/dislike.module';
import { PostActionValidatorService } from './post-action-validator.service';

@Module({
  //forwardRef is used for cyclic module dependences. I believe it makes nest resolve the order of module instantiation
  imports: [forwardRef(() => LikeModule), forwardRef(() => DislikeModule)],
  providers: [PostActionValidatorService],
  exports: [PostActionValidatorService],
})
export class PostActionValidatorModule {}
