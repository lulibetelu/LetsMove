import type { Post } from '../entities/post.entity';
export class GetPostDto {
  isLiked: boolean;
  isDisliked: boolean;

  user: {
    username: string;
  };
  content: string;
  createdAt: Date;
  id: number;
  userId: number;
  constructor(post: Post, isLiked: boolean, isDisliked: boolean) {
    this.user = { username: post.user.username };
    this.content = post.content;
    this.id = post.id;
    this.createdAt = post.createdAt;
    this.userId = post.userId;

    this.isLiked = isLiked;
    this.isDisliked = isDisliked;
  }
}
