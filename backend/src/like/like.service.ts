import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeRepositoryService } from '../repository/like/like.repository.service';

@Injectable()
export class LikeService {
  constructor(private likeRepository: LikeRepositoryService) {}

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
}
