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
  NotFoundException,
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
    const senderId = req.user.sub;
    return this.friendsService.create(senderId, createFriendDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  // de un user
  async findAll(@Req() req: Request) {
    const userId = req.user.sub;
    const promise = await this.friendsService.findAll(userId);

    if (!promise) throw new NotFoundException();
    return promise;
  }

  @Get('requests/:id')
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

  @Delete('requests/:id')
  @UseGuards(AuthGuard)
  // sos amigo y lo sacas
  remove(@Req() req: Request, @Param('id', ParseIntPipe) friendId: number) {
    const userId = req.user.sub;
    return this.friendsService.remove(userId, friendId);
  }
  //tuve que cambiar paths. No se si tienen mucho sentido.
  @Get('requests')
  @UseGuards(AuthGuard)
  async findAllRequested(@Req() req: Request) {
    const userId = req.user.sub;
    const promise = await this.friendsService.findAllRequested(userId);

    if (!promise) throw new NotFoundException();
    return promise;
  }
}
