import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '../authentication/auth.guard';
import type { Request } from 'express';
import { FindAllCommentDto } from './dto/find-all-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Req() request: Request, @Body() createCommentDto: CreateCommentDto) {
    const authorId: number = request.user.sub;
    return this.commentService.create(authorId, createCommentDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Body() findAllCommentDto: FindAllCommentDto) {
    return this.commentService.findAll(findAllCommentDto.postId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const editorId: number = req.user.sub;
    return this.commentService.update(editorId, +id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
