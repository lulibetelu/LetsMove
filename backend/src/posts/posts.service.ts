import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepositoryService } from '../repository/posts/posts.repository.service';
import { GetPostDto } from './dto/get-post-dto';
import { UserRepositoryService } from '../repository/user/user.repository.service';
import { PreferenceRepositoryService } from '../repository/preference/preference.repository.service';
import { ImageService } from '../images/image.service';

@Injectable()
export class PostsService {
  constructor(
    private postsRepository: PostsRepositoryService,
    private userRepository: UserRepositoryService,
    private preferencesRepository: PreferenceRepositoryService,
    private imageService: ImageService,
  ) {}

  async create(id: number, createPostDto: CreatePostDto) {
    const users = await this.preferencesRepository.findBySportId(
      createPostDto.selectedSportsId,
    );
    const sportMatchByUser = users.reduce(
      (acc, { userId }) => {
        acc[userId] = (acc[userId] ?? 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );
    const imageIds = await Promise.all(
      (createPostDto.images ?? []).map((image) =>
        Promise.resolve(this.imageService.create(image)),
      ),
    ).then((images) => images.map((image) => image.id));

    return await this.postsRepository.create(
      id,
      createPostDto,
      sportMatchByUser,
      imageIds,
    );
  }

  async findAll(currentUserId: number, page: number = 1, search?: string) {
    const posts = await this.postsRepository.findAll(
      currentUserId,
      page,
      search,
    );
    // if (posts.length === 0) {
    //   throw new NotFoundException(`User ${currentUserId} doesn't have posts`);
    // }
    return posts.map((post) => {
      const { postsLiked, postsDisliked, postSport, imagePosts, ...postData } =
        post;
      return new GetPostDto(
        postData,
        postsLiked.length === 1,
        postsDisliked.length === 1,
        postSport.map((ps) => ps.sportId),
        imagePosts,
      );
    });
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
    page: number = 1,
  ) {
    // verifico si existe el usuario
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException(`User ${userId} doesn't exist`);

    const posts = await this.postsRepository.findPostsFromUser(
      currentUserId,
      userId,
      page,
    );

    if (posts.length === 0) {
      throw new NotFoundException(`User ${currentUserId} doesn't have posts`);
    }

    return posts.map((post) => {
      const { postsLiked, postsDisliked, postSport, imagePosts, ...postData } =
        post;
      return new GetPostDto(
        postData,
        postsLiked.length === 1,
        postsDisliked.length === 1,
        postSport.map((ps) => ps.sportId),
        imagePosts,
      );
    });
  }
}
