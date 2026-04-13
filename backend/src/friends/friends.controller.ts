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
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { AuthGuard } from '../authentication/auth.guard';
import type { Request } from 'express';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Req() req: Request, @Body() createFriendDto: CreateFriendDto) {
    const userId = req.user.sub;
    return this.friendsService.create(userId, createFriendDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  // de un user
  findAll(@Req() req: Request) {
    const userId = req.user.sub;
    return this.friendsService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Req() req: Request, @Param('id', ParseIntPipe) friendId: number) {
    const userId = req.user.sub;
    return this.friendsService.findOne(userId, friendId);
  }

  @Patch()
  @UseGuards(AuthGuard)
  // aceptas o rechazas solicitud
  update(@Req() req: Request, @Body() updateFriendDto: UpdateFriendDto) {
    const userId = req.user.sub;
    return this.friendsService.update(userId, updateFriendDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  // sos amigo y lo sacas
  remove(@Req() req: Request, @Param('id', ParseIntPipe) friendId: number) {
    const userId = req.user.sub;
    return this.friendsService.remove(userId, friendId);
  }
}
