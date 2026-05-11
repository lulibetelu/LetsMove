import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
      throw new NotFoundException(
        `Event with id: ${createEventSignUpDto.eventId} doesn't exist`,
      );
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
    if (!event) throw new NotFoundException();
    if (event.hostId != hostId) throw new UnauthorizedException();
    return this.signUpRepositoryService.update(updateEventSignUpDto);
  }

  async remove(userId: number, eventId: number) {
    const event = await this.eventRepositoryService.findOneById(eventId);
    if (!event) throw new NotFoundException();
    return this.signUpRepositoryService.remove(userId, eventId);
  }
}
