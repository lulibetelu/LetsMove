import {
  Controller,
  Get,
  Post,
  Body,
  ParseIntPipe,
  Query,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthGuard } from '../authentication/auth.guard';
import type { Request } from 'express';
import { GroupService } from '../group/group.service';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly groupService: GroupService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Req() req: Request,
    @Query('groupId', ParseIntPipe) groupId: number,
  ) {
    const userId: number = req.user.sub;
    const isMember: boolean = await this.groupService.isMember(userId, groupId);

    if (!isMember)
      throw new UnauthorizedException('Requester must be group member');
    return this.messageService.findAll(groupId);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }
}
