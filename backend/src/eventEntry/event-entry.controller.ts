import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventEntryService } from './event-entry.service';
import { AuthGuard } from '../authentication/auth.guard';
import type { Request } from 'express';
import { CreateEventEntryDto } from './dto/create-event-entry-dto';

@Controller('event-entry')
export class EventEntryController {
  constructor(private eventEntryService: EventEntryService) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req: Request, @Body() entryDto: CreateEventEntryDto) {
    const user = req.user.sub;
    const promise = await this.eventEntryService.create(user, entryDto);
    if (!promise) throw new NotFoundException('No events found');
    return promise;
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async delete(
    @Req() req: Request,
    @Param('id', ParseIntPipe) entryId: number,
  ) {
    const user = req.user.sub;
    const promise = await this.eventEntryService.delete(entryId, user);
    if (!promise) throw new NotFoundException('No events found');
    return promise;
  }

  @UseGuards(AuthGuard)
  @Get('/event/:eventId')
  async getEntries(@Param('eventId', ParseIntPipe) eventId: number) {
    const promise = await this.eventEntryService.getEntries(eventId);
    if (!promise) throw new NotFoundException('No events found');
    return promise;
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getOneEntry(@Param('id', ParseIntPipe) entryId: number) {
    const promise = await this.eventEntryService.getOneEntry(entryId);
    if (!promise) throw new NotFoundException('No events found');
    return promise;
  }
}
