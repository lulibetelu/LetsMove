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
    return this.eventRepositoryService.findAll();
  }

  async findOne(id: number) {
    return this.eventRepositoryService.findOneById(id);
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    return await this.eventRepositoryService.updateEvent(id, updateEventDto);
  }

  async remove(id: number) {
    return await this.eventRepositoryService.deleteEvent(id);
  }
}
