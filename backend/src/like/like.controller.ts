import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  ConflictException,
  Inject,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { AuthGuard } from '../authentication/auth.guard';
import type { Request } from 'express';
import { PostActionValidatorService } from '../post-action-validator/post-action-validator.service';

@Controller('like')
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
    private postActionValidator: PostActionValidatorService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Req() req: Request, @Body() createLikeDto: CreateLikeDto) {
    const userId = req.user.sub;
    //  Here we validate that the user didn't dislike the post. Why would you like and dislike a post?\
    const canCreateLike: boolean =
      await this.postActionValidator.validateLikeCreation(
        userId,
        createLikeDto.postId,
      );

    if (canCreateLike) {
      return this.likeService.create(userId, createLikeDto);
    } else {
      throw new ConflictException('Cannot like post. Is disliked');
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Req() req: Request) {
    const userId = req.user.sub;
    const promise = await this.likeService.findAll(userId);

    if (!promise || promise.length === 0) throw new NotFoundException();
    return promise;
  }

  @Get('/post/:id')
  @UseGuards(AuthGuard)
  async findOne(@Req() req: Request, @Param('id', ParseIntPipe) postId: number) {
    const userId = req.user.sub;
    const promise = await this.likeService.findOne(userId, postId);

    if (!promise) throw new NotFoundException();
    return promise;
  }

  @Delete('/post/:id')
  @UseGuards(AuthGuard)
  remove(@Req() req: Request, @Param('id', ParseIntPipe) postId: number) {
    const userId = req.user.sub;
    return this.likeService.remove(userId, postId);
  }
}
