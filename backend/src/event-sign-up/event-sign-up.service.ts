import { Injectable } from '@nestjs/common';
import { CreateEventSignUpDto } from './dto/create-event-sign-up.dto';
import { UpdateEventSignUpDto } from './dto/update-event-sign-up.dto';
import { EventSignUpRepositoryService } from '../repository/eventSignUp/event-sign-up.repository.service';
import { EventRepositoryService } from '../repository/event/event.repository.service';

@Injectable()
export class EventSignUpService {
  constructor(private signUpRepositoryService: EventSignUpRepositoryService, private eventRepositoryService: EventRepositoryService ) {}
  create(createEventSignUpDto: CreateEventSignUpDto, userId: number) {
    const event = this.eventRepositoryService.findOneById(
      createEventSignUpDto.eventId,
    );
    if () {
      return this.signUpRepositoryService.create(createEventSignUpDto, userId);
    }
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

  update(eventId: number, userId: number, updateEventSignUpDto: UpdateEventSignUpDto) {
    return `This action updates a #${id} eventSignUp`;
  }

  remove(eventId: number, userId: number) {
    return `This action removes a #${id} eventSignUp`;
  }
}
