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
} from '@nestjs/common';
import { DislikeService } from './dislike.service';
import { CreateDislikeDto } from './dto/create-dislike.dto';
import { AuthGuard } from '../authentication/auth.guard';
import type { Request } from 'express';
import { PostActionValidatorService } from '../post-action-validator/post-action-validator.service';

@Controller('dislike')
export class DislikeController {
  constructor(
    private readonly dislikeService: DislikeService,
    private postActionValidator: PostActionValidatorService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Req() request: Request, @Body() createDislikeDto: CreateDislikeDto) {
    const userId: number = request.user.sub;
    //  Here we validate that the user didn't dislike the post. Why would you like and dislike a post?\
    const canCreate: boolean = this.postActionValidator.validateDislikeCreation(
      userId,
      createDislikeDto.postId,
    );
    if (canCreate) {
      return this.dislikeService.create(userId, createDislikeDto);
    } else {
      throw new ConflictException('Cannot dislike post. Is liked');
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() request: Request) {
    const userId: number = request.user.sub;
    return this.dislikeService.findAll(userId);
  }

  @Get('post/:id')
  @UseGuards(AuthGuard)
  findOne(@Req() request: Request, @Param('id', ParseIntPipe) postId: number) {
    //si pincha, ojo aca con el number.
    const userId: number = request.user.sub;
    return this.dislikeService.findOne(userId, postId);
  }

  @Delete('post/:id')
  @UseGuards(AuthGuard)
  //Consideration: this method is handling postId differently than create
  remove(@Req() request: Request, @Param('id', ParseIntPipe) postId: number) {
    const userId = request.user.sub;
    return this.dislikeService.remove(userId, postId);
  }
}
