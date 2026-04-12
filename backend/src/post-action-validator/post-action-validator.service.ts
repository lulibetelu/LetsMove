import { Injectable } from '@nestjs/common';
import { DislikeService } from '../dislike/dislike.service';
import { LikeService } from '../like/like.service';

@Injectable()
export class PostActionValidatorService {
  constructor(
    private dislikeService: DislikeService,
    private likeService: LikeService,
  ) {}

  async validateDislikeCreation(userId: number, postId: number) {
    const like = await this.likeService.findOne(userId, postId);
    return like === null;
  }

  async validateLikeCreation(userId: number, postId: number): Promise<boolean> {
    const dislike = await this.dislikeService.findOne(userId, postId);
    return dislike === null;
  }
}
