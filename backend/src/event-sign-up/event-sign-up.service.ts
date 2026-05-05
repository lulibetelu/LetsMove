import { Injectable } from '@nestjs/common';
import { CreateEventSignUpDto } from './dto/create-event-sign-up.dto';
import { UpdateEventSignUpDto } from './dto/update-event-sign-up.dto';
import { EventSignUpRepositoryService } from '../repository/eventSignUp/event-sign-up.repository.service';
import { EventRepositoryService } from '../repository/event/event.repository.service';

@Injectable()
export class EventSignUpService {
  constructor(
    private signUpRepositoryService: EventSignUpRepositoryService,
    private eventRepositoryService: EventRepositoryService,
  ) {}
  async create(createEventSignUpDto: CreateEventSignUpDto, userId: number) {
    const event = await this.eventRepositoryService.findOneById(
      createEventSignUpDto.eventId,
    );
    if (!event) {
      throw new Error('');
    }
    if (event.isPrivate) {
      return this.signUpRepositoryService.create(
        createEventSignUpDto,
        userId,
        'Requested',
        undefined,
      );
    }
    return this.signUpRepositoryService.create(
      createEventSignUpDto,
      userId,
      'Accepted',
      new Date(),
    );
  }

  findAllFromUser(userId: number) {
    return this.signUpRepositoryService.findAllFromUser(userId);
  }

  findAllFromEvent(eventId: number) {
    return this.signUpRepositoryService.findAllFromEvent(eventId);
  }

  findOne(eventId: number, userId: number) {
    return this.signUpRepositoryService.findOne(userId, eventId);
  }

  async update(hostId: number, updateEventSignUpDto: UpdateEventSignUpDto) {
    const event = await this.eventRepositoryService.findOneById(
      updateEventSignUpDto.eventId,
    );
    if (!event) throw new Error();
    if (event.hostId != hostId) throw new Error();
    return this.signUpRepositoryService.update(updateEventSignUpDto);
  }

  async remove(dto: CreateEventSignUpDto, userId: number) {
    const event = await this.eventRepositoryService.findOneById(dto.eventId);
    if (!event) throw new Error();
    return this.signUpRepositoryService.remove(userId, dto);
  }
}
