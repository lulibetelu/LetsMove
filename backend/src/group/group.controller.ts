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
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AuthGuard } from '../authentication/auth.guard';
import type { Request } from 'express';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupsService: GroupService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req: Request, @Body() createGroupDto: CreateGroupDto) {
    const userId = req.user.sub;
    return this.groupsService.create(createGroupDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req: Request) {
    const userId = req.user.sub;
    return this.groupsService.findAll(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const userId = req.user.sub;
    return this.groupsService.findOne(id, userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGroupDto: UpdateGroupDto,
    @Req() req: Request,
  ) {
    const userId = req.user.sub;
    return this.groupsService.update(id, updateGroupDto, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) groupId: number, @Req() req: Request) {
    const userId = req.user.sub;
    return this.groupsService.remove(groupId, userId);
  }
}
