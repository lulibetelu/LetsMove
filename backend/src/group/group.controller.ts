import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req, ParseIntPipe,
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
  @Get('/:userId')
  findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.groupsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.remove(id);
  }
}
