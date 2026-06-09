import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Req,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { SavedEventService } from './saved-event.service';
import { SavedEventDto } from './dto/saved-event.dto';
import { AuthGuard } from '../authentication/auth.guard';
import type { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('saved-event')
export class SavedEventController {
  constructor(private readonly savedEventService: SavedEventService) {}

  @Post()
  @UseGuards(AuthGuard)
  save(@Req() req: Request, @Body() dto: SavedEventDto) {
    const userId = req.user.sub;
    return this.savedEventService.save(userId, dto.eventId);
  }

  @Delete(':eventId')
  @UseGuards(AuthGuard)
  unsave(@Req() req: Request, @Param('eventId', ParseIntPipe) eventId: number) {
    const userId = req.user.sub;
    return this.savedEventService.unsave(userId, eventId);
  }

  @Get()
  findAllFromUser(@Req() req: Request) {
    const userId = req.user.sub;
    return this.savedEventService.findAllFromUser(userId);
  }

  @Get(':eventId')
  findOne(
    @Req() req: Request,
    @Param('eventId', ParseIntPipe) eventId: number,
  ) {
    const userId = req.user.sub;
    return this.savedEventService.findOne(userId, eventId);
  }
}
