import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeRepositoryService } from '../repository/like/like.repository.service';
import { DislikeService } from '../dislike/dislike.service';

@Injectable()
export class LikeService {
  constructor(
    private likeRepository: LikeRepositoryService,
    private dislikeService: DislikeService,
  ) {}

  async create(userId: number, createLikeDto: CreateLikeDto) {
    try {
      return this.likeRepository.create(userId, createLikeDto);
    } catch {
      throw new Error('user liked post twice');
    }
  }

  async findAll(userId: number) {
    return this.likeRepository.findAll(userId);
  }

  findOne(userId: number, postId: number) {
    return this.likeRepository.findUnique(userId, postId);
  }

  remove(userId: number, postId: number) {
    try {
      return this.likeRepository.delete(userId, postId);
    } catch {
      throw new NotFoundException("tried to delete like that didn't exist");
    }
  }

  async validateCreation(userId: number, postId: number): Promise<boolean> {
    const dislike = await this.dislikeService.findOne(userId, postId);
    if (dislike === null) return true;

    return false;
  }
}
