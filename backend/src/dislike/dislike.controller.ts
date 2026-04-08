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
} from '@nestjs/common';
import { DislikeService } from './dislike.service';
import { CreateDislikeDto } from './dto/create-dislike.dto';
import { AuthGuard } from '../authentication/auth.guard';
import type { Request } from 'express';

@Controller('dislike')
export class DislikeController {
  constructor(private readonly dislikeService: DislikeService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Req() request: Request, @Body() createDislikeDto: CreateDislikeDto) {
    const userId: number = request.user.sub;
    return this.dislikeService.create(userId, createDislikeDto);
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
  remove(@Req() request: Request, @Param('id', ParseIntPipe) postId: number) {
    const userId = request.user.sub;
    return this.dislikeService.remove(userId, postId);
  }
}
