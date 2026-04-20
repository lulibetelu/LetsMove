import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from '../../comment/dto/create-comment.dto';
import { UpdateCommentDto } from '../../comment/dto/update-comment.dto';

@Injectable()
export class CommentRepositoryService {
  constructor(private prismaService: PrismaService) {}
  async create(authorId: number, createCommentDto: CreateCommentDto) {
    return this.prismaService.post.update({
      where: { id: createCommentDto.postId },
      data: {
        comments: {
          create: {
            authorId: authorId,
            content: createCommentDto.content,
          },
        },
      },
    });
  }

  async findAll(postId: number) {
    return this.prismaService.comment.findMany({
      where: {
        postId: postId,
      },
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.prismaService.comment.update({
      where: { id: id },
      data: { content: updateCommentDto.content },
    });
  }

  async findOne(commentId: number) {
    return this.prismaService.comment.findUnique({
      where: {
        id: commentId,
      },
    });
  }

  async remove(commentId: number){
    return this.prismaService.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
}
