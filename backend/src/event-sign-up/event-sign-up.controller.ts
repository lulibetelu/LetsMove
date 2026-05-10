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
  UseGuards,
} from '@nestjs/common';
import { EventSignUpService } from './event-sign-up.service';
import { CreateEventSignUpDto } from './dto/create-event-sign-up.dto';
import { UpdateEventSignUpDto } from './dto/update-event-sign-up.dto';
import type { Request } from 'express';
import { AuthGuard } from '../authentication/auth.guard';

@Controller('event-sign-up')
export class EventSignUpController {
  constructor(private readonly eventSignUpService: EventSignUpService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Req() req: Request,
    @Body() createEventSignUpDto: CreateEventSignUpDto,
  ) {
    const userId = req.user.sub;
    return this.eventSignUpService.create(createEventSignUpDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get('/user/:id')
  findAllFromUser(@Param('id', ParseIntPipe) userId: number) {
    return this.eventSignUpService.findAllFromUser(userId);
  }

  @UseGuards(AuthGuard)
  @Get('/event/:id')
  findAllFromEvent(@Param('id', ParseIntPipe) eventId: number) {
    return this.eventSignUpService.findAllFromEvent(eventId);
  }

  @UseGuards(AuthGuard)
  @Get()
  findOne(
    @Query('eventId', ParseIntPipe) eventId: number,
    @Query('userId', ParseIntPipe) userId: number,
  ) {
    return this.eventSignUpService.findOne(eventId, userId);
  }

  @UseGuards(AuthGuard)
  @Patch()
  update(
    @Req() req: Request,
    @Body() updateEventSignUpDto: UpdateEventSignUpDto,
  ) {
    const hostId = req.user.sub;
    return this.eventSignUpService.update(hostId, updateEventSignUpDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  remove(@Req() req: Request, @Param('id', ParseIntPipe) eventId: number) {
    const userId = req.user.sub;
    return this.eventSignUpService.remove(userId, eventId);
  }
}
