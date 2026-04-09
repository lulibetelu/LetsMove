import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDislikeDto } from '../../dislike/dto/create-dislike.dto';

@Injectable()
export class DislikeRepositoryService {
  constructor(private prismaService: PrismaService) {}
  async create(userId: number, createDislikeDto: CreateDislikeDto) {
    return this.prismaService.postDisliked.create({
      data: {
        ...createDislikeDto,
        userId,
      },
    });
  }

  async getAllDislikes(userId: number) {
    return this.prismaService.postDisliked.findMany({
      where: { userId: userId },
    });
  }

  async getOneDislike(userId: number, postId: number) {
    return this.prismaService.postDisliked.findUnique({
      where: {
        postId_userId: {
          postId: postId,
          userId: userId,
        },
      },
    });
  }

  async removeDislike(userId: number, postId: number) {
    return this.prismaService.postDisliked.delete({
      where: {
        postId_userId: {
          postId: postId,
          userId: userId,
        },
      },
    });
  }
}
