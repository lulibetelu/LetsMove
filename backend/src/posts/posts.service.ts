import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepositoryService } from '../repository/posts/posts.repository.service';
import { GetPostDto } from './dto/get-post-dto';
import { LikeService } from '../like/like.service';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    private postsRepository: PostsRepositoryService,
    private likeService: LikeService,
  ) {}

  async create(userId: number, createPostDto: CreatePostDto) {
    return this.postsRepository.create(userId, createPostDto);
  }

  async findAll(userId: number) {
    // esto es suuper ineficiente, lo ideal seria hacer una query mas compleja que haga esto
    const posts = await this.postsRepository.findAll();

    const likedPosts = await this.likeService.findAll(userId);
    const likedPostsId = likedPosts.map((p) => {
      return p.postId;
    });

    const dislikedPosts: number[] = [];

    return posts.map((p: Post) => {
      if (likedPostsId.includes(p.id)) return new GetPostDto(p, true, false);

      if (dislikedPosts.includes(p.id)) return new GetPostDto(p, false, true);

      return new GetPostDto(p, false, false);
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
