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
  Query,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from '../authentication/auth.guard';
import type { Request } from 'express';
import { FilterEventDto } from './dto/filter-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req: Request, @Body() createEventDto: CreateEventDto) {
    const hostId: number = req.user.sub;
    return this.eventService.create(hostId, createEventDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req: Request) {
    //Paso el Id para que en un futuro podamos usarlo para el feed de eventos "inteligente"
    const requesterId = req.user.sub;
    const promise = await this.eventService.findAll(requesterId);

    if (!promise || promise.length === 0)
      throw new NotFoundException('No events found');

    return promise;
  }

  @UseGuards(AuthGuard)
  @Get('limited')
  async findLimited(
    @Req() req: Request,
    @Query('page', ParseIntPipe) page: number,
    @Body() filters: FilterEventDto,
  ) {
    const promise = await this.eventService.findLimited(page, filters);

    //No quiero que no me tire un arreglo vacio
    if (!promise) throw new NotFoundException();
    return promise;
  }

  @UseGuards(AuthGuard)
  @Get('host')
  async findAllFromUser(@Req() req: Request) {
    const userId = req.user.sub;
    const promise = await this.eventService.findAllFromUser(userId);

    if (!promise) throw new NotFoundException();
    return promise;
  }

  @UseGuards(AuthGuard)
  @Get('participates')
  getEventsUserParticipate(
    @Req() req: Request,
    @Query('page', ParseIntPipe) page: number,
    @Query('id', ParseIntPipe) requestedId: number,
  ) {
    return this.eventService.findEventsUserParticipates(requestedId, page);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const promise = await this.eventService.findOne(id);

    if (!promise) throw new NotFoundException();
    return promise;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
    @Req() req: Request,
  ) {
    const modifierId: number = req.user.sub;
    return await this.eventService.update(id, modifierId, updateEventDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const removerId: number = req.user.sub;
    return this.eventService.remove(id, removerId);
  }
}
