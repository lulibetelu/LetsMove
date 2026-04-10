import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepositoryService } from '../repository/posts/posts.repository.service';
import { LikeService } from '../like/like.service';
import { GetPostDto } from './dto/get-post-dto';

@Injectable()
export class PostsService {
  constructor(
    private postsRepository: PostsRepositoryService,
    private likeService: LikeService,
  ) {}

  async create(userId: number, createPostDto: CreatePostDto) {
    return this.postsRepository.create(userId, createPostDto);
  }

  async findAll(currentUserId: number) {
    const posts = await this.postsRepository.findAll(currentUserId);

    return posts.map((post) => {
      const { postsLiked, postsDisliked, ...postData } = post;
      return new GetPostDto(
        postData,
        postsLiked.length === 1,
        postsDisliked.length === 1,
      );
    });
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
