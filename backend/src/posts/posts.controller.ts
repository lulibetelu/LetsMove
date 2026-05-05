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
  Query,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '../authentication/auth.guard';
import type { Request } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
    const userId = req.user.sub;
    return this.postsService.create(userId, createPostDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Req() req: Request,
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
  ) {
    const userId = req.user.sub;
    const promise = await this.postsService.findAll(userId, page);

    if (!promise || promise.length === 0)
      throw new NotFoundException('posts not found');
    return promise;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const promise = await this.postsService.findOne(id);

    if (!promise) throw new NotFoundException('post not found');
    return promise;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.sub;
    return this.postsService.remove(userId, id);
  }

  @UseGuards(AuthGuard)
  @Get('/user/:id')
  findPostsFromUser(
    @Req() req: Request,
    @Param('id', ParseIntPipe) userId: number,
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
  ) {
    const currentUserId = req.user.sub;
    return this.postsService.findPostsFromUser(currentUserId, userId, page);
  }
}
