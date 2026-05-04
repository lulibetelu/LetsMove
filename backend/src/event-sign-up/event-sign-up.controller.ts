import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { EventSignUpService } from './event-sign-up.service';
import { CreateEventSignUpDto } from './dto/create-event-sign-up.dto';
import { UpdateEventSignUpDto } from './dto/update-event-sign-up.dto';
import type { Request } from 'express';

@Controller('event-sign-up')
export class EventSignUpController {
  constructor(private readonly eventSignUpService: EventSignUpService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createEventSignUpDto: CreateEventSignUpDto,
  ) {
    const userId = req.user.sub;
    return this.eventSignUpService.create(createEventSignUpDto, userId);
  }

  @Get('/user/:id')
  findAllFromUser(@Param('id', ParseIntPipe) userId: number) {
    return this.eventSignUpService.findAllFromUser(userId);
  }

  @Get('/event/:id')
  findAllFromEvent(@Param('id', ParseIntPipe) eventId: number) {
    return this.eventSignUpService.findAllFromEvent(eventId);
  }

  @Get()
  findOne(
    @Query('eventId', ParseIntPipe) eventId: number,
    @Query('userId', ParseIntPipe) userId: number,
  ) {
    return this.eventSignUpService.findOne(eventId, userId);
  }

  @Patch()
  update(
    @Query('eventId', ParseIntPipe) eventId: number,
    @Query('userId', ParseIntPipe) userId: number,
    @Body() updateEventSignUpDto: UpdateEventSignUpDto,
  ) {
    return this.eventSignUpService.update(
      eventId,
      userId,
      updateEventSignUpDto,
    );
  }

  @Delete()
  remove(
    @Query('eventId', ParseIntPipe) eventId: number,
    @Query('userId', ParseIntPipe) userId: number,
  ) {
    return this.eventSignUpService.remove(eventId, userId);
  }
}
