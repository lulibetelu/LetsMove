import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { AuthGuard } from '../authentication/auth.guard';
import type { Request } from 'express';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Req() req: Request, @Body() createLikeDto: CreateLikeDto) {
    const userId = req.user.sub;
    return this.likeService.create(userId, createLikeDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req: Request) {
    const userId = req.user.sub;
    return this.likeService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Req() req: Request, @Param('id') id: string) {
    const userId = req.user.sub;
    return this.likeService.findOne(userId, +id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Req() req: Request, @Param('id') id: string) {
    const userId = req.user.sub;
    return this.likeService.remove(userId, +id);
  }
}
