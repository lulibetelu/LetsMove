import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from '../../like/dto/create-like.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LikeRepositoryService {
  constructor(private prismaService: PrismaService) {}

  async create(userId: number, createLikeDto: CreateLikeDto){
    return this.prismaService.postLiked.create({
      data: {
        ...createLikeDto,
        userId: userId,
        postId: createLikeDto.postId,
      },
    });
  }
  async findAll(userId: number){
    return this.prismaService.postLiked.findMany({
      where: {
        userId: userId,
      },
    });
  }
  async findUnique(userId: number, postId: number){
    return this.prismaService.postLiked.findUnique({
      where: {
        postId_userId: {
          userId: userId,
          postId: postId,
        },
      },
    });
  }
  async delete(userId: number, postId: number){
    return this.prismaService.postLiked.delete({
      where: {
        postId_userId: {
          userId: userId,
          postId: postId,
        },
      },
    });
  }
}
