import { Injectable } from '@nestjs/common';
import { DislikeService } from '../dislike/dislike.service';
import { LikeService } from '../like/like.service';

@Injectable()
export class PostActionValidatorService {
  constructor(
    private dislikeService: DislikeService,
    private likeService: LikeService,
  ) {}

  validateDislikeCreation(userId: number, postId: number) {
    const like = this.likeService.findOne(userId, postId);
    return like === null;
  }

  validateLikeCreation(userId: number, postId: number): boolean {
    const dislike = this.dislikeService.findOne(userId, postId);
    return dislike === null;
  }
}
