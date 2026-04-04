import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepositoryService } from '../repository/posts/posts.repository.service';

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepositoryService) {}

  async create(userId: number, createPostDto: CreatePostDto) {
    return this.postsRepository.create(userId, createPostDto);
  }

  async findAll() {
    return this.postsRepository.findAll();
  }

  async findOne(postId: number) {
    return this.postsRepository.findUnique(postId);
  }

  async remove(userId: number, postId: number) {
    const post = await this.postsRepository.findUnique(postId);
    if (!post) throw new NotFoundException();
    const idUser = post.userId;
    if (idUser != userId) throw new UnauthorizedException();
    return this.postsRepository.delete(postId);
  }
}
