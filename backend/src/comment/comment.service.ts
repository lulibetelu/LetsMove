import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepositoryService } from '../repository/comment/comment.repository.service';

@Injectable()
export class CommentService {
  constructor(private commentRepositoryServices: CommentRepositoryService) {}

  create(authorId: number, createCommentDto: CreateCommentDto) {
    return this.commentRepositoryServices.create(authorId, createCommentDto);
  }

  findAll(postId: number) {
    return this.commentRepositoryServices.findAll(postId);
  }

  private findOne(commentId: number) {
    return this.commentRepositoryServices.findOne(commentId);
  }

  async update(
    editorId: number,
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ) {
    const comment = await this.findOne(commentId);

    if (comment === null || comment.authorId !== editorId)
      throw new UnauthorizedException('Only author can edit this comment.');

    return this.commentRepositoryServices.update(commentId, updateCommentDto);
  }

  async remove(removerId: number, commentId: number) {
    const comment = await this.findOne(commentId);

    if (comment === null || comment.authorId !== removerId)
      throw new UnauthorizedException('Only author can remove this comment');

    return this.commentRepositoryServices.remove(commentId);
  }
}
