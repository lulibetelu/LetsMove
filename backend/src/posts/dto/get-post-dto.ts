import type { Post } from '../entities/post.entity';
export class GetPostDto {
  user: {
    username: string;
  };
  content: string;
  createdAt: Date;
  id: number;
  userId: number;
  isLiked: boolean;
  isDisliked: boolean;
  postSports: number[];

  constructor(
    post: Post,
    isLiked: boolean,
    isDisliked: boolean,
    postSports: number[],
  ) {
    this.user = { username: post.user.username };
    this.content = post.content;
    this.id = post.id;
    this.createdAt = post.createdAt;
    this.userId = post.userId;

    this.isLiked = isLiked;
    this.isDisliked = isDisliked;

    this.postSports = postSports;
  }
}
