import { Injectable } from '@nestjs/common';
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

  remove(userId: number, postId: number) {
    return this.dislikeRepositoryService.removePost(userId, postId);
  }
}
