import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from '../../posts/dto/create-post.dto';

@Injectable()
export class PostsRepositoryService {
  constructor(private prismaService: PrismaService) {}

  async create(userId: number, createPostDto: CreatePostDto) {
    return this.prismaService.post.create({
      data: {
        ...createPostDto,
        userId: userId,
      },
    });
  }

  async findAll(currentUserId: number, lastPostId: number) {
    return this.prismaService.post.findMany({
      orderBy: { createdAt: 'desc' },
      // take toma de a 20 posteos, cursor le dice que te traiga 20 posts a partir de un post en particular
      // y skip porque el cursor automaticamente incluye el post del id que le pasas
      take: 50,
      ...(lastPostId ? { cursor: { id: lastPostId }, skip: 1 } : {}),
      include: {
        user: {
          select: {
            username: true,
          },
        },
        postsLiked: {
          where: { userId: currentUserId },
          select: { id: true },
        },
        postsDisliked: {
          where: { id: currentUserId },
          select: { id: true },
        },
      },
    });
  }

  async findUnique(postId: number) {
    return this.prismaService.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
  }

  async delete(postId: number) {
    return this.prismaService.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
