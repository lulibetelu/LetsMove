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
    return `This action returns all eventSignUp`;
  }

  findAllFromEvent(eventId: number) {
    return `This action returns all eventSignUp`;
  }

  findOne(eventId: number, userId: number) {
    return `This action returns a #${id} eventSignUp`;
  }

  update(
    eventId: number,
    userId: number,
    updateEventSignUpDto: UpdateEventSignUpDto,
  ) {
    return `This action updates a #${id} eventSignUp`;
  }

  remove(eventId: number, userId: number) {
    return `This action removes a #${id} eventSignUp`;
  }
}
