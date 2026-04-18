import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from '../../posts/dto/create-post.dto';

@Injectable()
export class PostsRepositoryService {
  constructor(private prismaService: PrismaService) {}

  async create(
    userId: number,
    createPostDto: CreatePostDto,
    sportMatchByUser: Record<number, number>,
  ) {
    // 1. creo el post
    const newPost = await this.prismaService.post.create({
      data: {
        content: createPostDto.content,
        userId: userId,
      },
    });
    // 2. creo el postSport, guardando los sports de los que habla el post
    await this.prismaService.postSport.createMany({
      data: createPostDto.sports.map((sportId) => ({
        postId: newPost.id,
        sportId,
      })),
    });
    // 3. a todos los usuarios que les interesa alguno de esos deportes, se les agrega una tupla en postScore
    await this.prismaService.postScore.createMany({
      data: Object.entries(sportMatchByUser).map(([userId, sportMatch]) => ({
        userId: Number(userId),
        postId: newPost.id,
        sportMatch,
      })),
    });

    return newPost;
  }

  async findAll(currentUserId: number, lastPostId?: number) {
    return this.prismaService.post.findMany({
      orderBy: { createdAt: 'desc' },
      // take toma de a 20 posteos, cursor le dice que te traiga 20 posts a partir de un post en particular
      // y skip porque el cursor automaticamente incluye el post del id que le pasas
      take: 50,
      ...(lastPostId ? { cursor: { id: lastPostId }, skip: 1 } : {}),
      include: {
        postsDisliked: {
          where: { userId: currentUserId },
          select: { id: true },
        },
        postsLiked: {
          where: { userId: currentUserId },
          select: { id: true },
        },
        user: {
          select: {
            username: true,
          },
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
    const deletedPost = await this.prismaService.post.delete({
      where: {
        id: postId,
      },
    });

    await this.prismaService.postSport.deleteMany({
      where: {
        postId: postId,
      },
    });

    return deletedPost;
  }

  async findPostsFromUser(
    currentUserId: number,
    userId: number,
    lastPostId?: number,
  ) {
    return this.prismaService.post.findMany({
      orderBy: { createdAt: 'desc' },
      // take toma de a 20 posteos, cursor le dice que te traiga 20 posts a partir de un post en particular
      // y skip porque el cursor automaticamente incluye el post del id que le pasas
      take: 50,
      ...(lastPostId ? { cursor: { id: lastPostId }, skip: 1 } : {}),
      where: {
        userId: userId,
      },
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
          where: { userId: currentUserId },
          select: { id: true },
        },
      },
    });
  }
}
