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

  async findAll() {
    return this.prismaService.post.findMany();
  }

  async findUnique(postId: number) {
    return this.prismaService.post.findUnique({
      where: { id: postId },
    });
  }

  async delete(userId: number, postId: number) {
    return this.prismaService.post.delete({
      where: {
        userId: userId,
        id: postId,
      },
    });
  }
}
