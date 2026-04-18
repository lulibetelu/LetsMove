import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepositoryService } from '../repository/posts/posts.repository.service';
import { GetPostDto } from './dto/get-post-dto';
import { UserRepositoryService } from '../repository/user/user.repository.service';

@Injectable()
export class PostsService {
  constructor(
    private postsRepository: PostsRepositoryService,
    private userRepository: UserRepositoryService,
  ) {}

  async create(userId: number, createPostDto: CreatePostDto) {

    return await this.postsRepository.create(userId, createPostDto);
  }

  async findAll(currentUserId: number, lastPostId?: number) {
    const posts = await this.postsRepository.findAll(currentUserId, lastPostId);

    const formattedPosts = posts.map((post) => {
      const { postsLiked, postsDisliked, ...postData } = post;
      return new GetPostDto(
        postData,
        postsLiked.length === 1,
        postsDisliked.length === 1,
      );
    });
    const newCursor = formattedPosts[formattedPosts.length - 1]?.id;
    return { formattedPosts, newCursor };
  }

  async findOne(postId: number) {
    const post = await this.postsRepository.findUnique(postId);
    if (!post) throw new NotFoundException(`Post ${postId} doesn't exist`);
    return post;
  }

  async remove(userId: number, postId: number) {
    const post = await this.postsRepository.findUnique(postId);
    if (!post) throw new NotFoundException(`Post ${postId} doesn't exist`);

    const idUser = post.userId;
    if (idUser != userId) throw new UnauthorizedException();
    return this.postsRepository.delete(postId);
  }

  async findPostsFromUser(
    currentUserId: number,
    userId: number,
    lastPostId?: number,
  ) {
    // verifico si existe el usuario
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException(`User ${userId} doesn't exist`);

    const posts = await this.postsRepository.findPostsFromUser(
      currentUserId,
      userId,
      lastPostId,
    );

    const formattedPosts = posts.map((post) => {
      const { postsLiked, postsDisliked, ...postData } = post;
      return new GetPostDto(
        postData,
        postsLiked.length === 1,
        postsDisliked.length === 1,
      );
    });

    const newCursor = formattedPosts[formattedPosts.length - 1]?.id;
    return { formattedPosts, newCursor };
  }
}
