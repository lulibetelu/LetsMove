import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EventRepositoryService } from '../repository/event/event.repository.service';
import { CreateEventEntryDto } from './dto/create-event-entry-dto';
import { EventSignUpRepositoryService } from '../repository/eventSignUp/event-sign-up.repository.service';

@Injectable()
export class EventEntryService {
  constructor(
    private eventRepositoryService: EventRepositoryService,
    private eventSignUpRepository: EventSignUpRepositoryService,
  ) {}
  async create(userId: number, entryDto: CreateEventEntryDto) {
    const event = await this.eventRepositoryService.findOneById(
      entryDto.eventId,
    );
    const eventSignUps = await this.eventSignUpRepository.findAllFromEvent(
      entryDto.eventId,
    );
    if (event === null) throw new NotFoundException('Event not found');
    const isParticipant = eventSignUps.some(
      (signUp) => signUp.userId === userId && signUp.state === 'Accepted',
    );
    if (!isParticipant)
      throw new UnauthorizedException('Must be a member to create an entry');
    return await this.eventRepositoryService.createEventEntry(userId, entryDto);
  }

  async delete(entryId: number){
    const event = await this.eventRepositoryService.getEventEntry(entryId);
    if (event === null) throw new NotFoundException('Entry not found');
    return this.eventRepositoryService.deleteEventEntry(entryId);
  }

  async getOneEntry(entryId: number){
    return this.eventRepositoryService.getEventEntry(entryId);
  }

  async getEntries(){
    return this.eventRepositoryService.getEntries();
  }

}
