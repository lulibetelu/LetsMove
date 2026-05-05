import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDislikeDto } from './dto/create-dislike.dto';
import { DislikeRepositoryService } from '../repository/dislike/dislike.repository.service';

@Injectable()
export class DislikeService {
  constructor(private dislikeRepositoryService: DislikeRepositoryService) {}
  create(userId: number, createDislikeDto: CreateDislikeDto) {
    return this.dislikeRepositoryService.create(userId, createDislikeDto);
  }

  findAll(userId: number) {
    return this.dislikeRepositoryService.getAllDislikes(userId);
  }

  findOne(userId: number, postId: number) {
    return this.dislikeRepositoryService.getOneDislike(userId, postId);
  }

  async remove(userId: number, postId: number) {
    const dislike = await this.findOne(userId, postId);

    if (!dislike) {
      throw new NotFoundException('dislike not found');
    }
    return this.dislikeRepositoryService.removeDislike(userId, postId);
  }
}
