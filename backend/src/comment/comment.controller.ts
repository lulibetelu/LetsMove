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
  ParseIntPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '../authentication/auth.guard';
import type { Request } from 'express';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Req() request: Request, @Body() createCommentDto: CreateCommentDto) {
    const authorId: number = request.user.sub;
    return this.commentService.create(authorId, createCommentDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  // todos los comentarios de un posteo
  findAll(@Param('id', ParseIntPipe) postId: number) {
    return this.commentService.findAll(postId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const editorId: number = req.user.sub;
    return this.commentService.update(editorId, commentId, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Req() req: Request, @Param('id', ParseIntPipe) commentId: number) {
    const removerId: number = req.user.sub;
    return this.commentService.remove(removerId, commentId);
  }
}
