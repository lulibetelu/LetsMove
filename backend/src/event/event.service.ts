import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventRepositoryService } from '../repository/event/event.repository.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventService {
  constructor(private eventRepositoryService: EventRepositoryService) {}
  async create(hostId: number, createEventDto: CreateEventDto) {
    return await this.eventRepositoryService.createEvent(
      hostId,
      createEventDto,
    );
  }

  async findAll(requesterId: number) {
    return this.eventRepositoryService.findAll(requesterId);
  }

  async findOne(id: number) {
    return this.eventRepositoryService.findOneById(id);
  }

  async findAllFromUser(userId: number) {
    return this.eventRepositoryService.findAllFromUser(userId);
  }

  async update(
    eventId: number,
    modifierId: number,
    updateEventDto: UpdateEventDto,
  ) {
    return await this.eventRepositoryService.updateEvent(
      eventId,
      modifierId,
      updateEventDto,
    );
  }

  async findLimited(requesterId: number, page: number) {
    return this.eventRepositoryService.findLimited(requesterId, page);
  }

  async remove(id: number, removerId: number) {
    return await this.eventRepositoryService.deleteEvent(id, removerId);
  }

  findEventsUserParticipates(requesterId: number, page: number) {
    return this.eventRepositoryService.findEventsUserParticipates(
      requesterId,
      page,
    );
  }
}
