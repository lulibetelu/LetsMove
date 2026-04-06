import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeRepositoryService } from '../repository/like/like.repository.service';

@Injectable()
export class LikeService {
  constructor(private likeRepository: LikeRepositoryService) {}

  async create(userId: number, createLikeDto: CreateLikeDto) {
    return this.likeRepository.create(userId, createLikeDto);
  }

  async findAll(userId: number) {
    return this.likeRepository.findAll(userId);
  }

  findOne(userId: number, postId: number) {
    return this.likeRepository.findUnique(userId, postId);
  }

  remove(userId: number, postId: number) {
    return this.likeRepository.delete(userId, postId);
  }
}
