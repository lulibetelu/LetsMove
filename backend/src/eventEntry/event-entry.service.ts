import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EventRepositoryService } from '../repository/event/event.repository.service';
import { CreateEventEntryDto } from './dto/create-event-entry-dto';
import { EventSignUpRepositoryService } from '../repository/eventSignUp/event-sign-up.repository.service';
import { ImageService } from '../images/image.service';

@Injectable()
export class EventEntryService {
  constructor(
    private eventRepositoryService: EventRepositoryService,
    private eventSignUpRepository: EventSignUpRepositoryService,
    private imageService: ImageService,
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

    const imageIds = await Promise.all(
      (entryDto.images ?? []).map((image) =>
        Promise.resolve(this.imageService.create(image)),
      ),
    ).then((images) => images.map((image) => image.id));

    return await this.eventRepositoryService.createEventEntry(
      userId,
      entryDto,
      imageIds,
    );
  }

  async delete(entryId: number, userId: number) {
    const event = await this.eventRepositoryService.getEventEntry(entryId);
    if (event === null) throw new NotFoundException('Entry not found');
    const entry = await this.eventRepositoryService.getEventEntry(entryId);
    if (entry === null) throw new NotFoundException('Entry not found');
    if (entry.userId != userId)
      throw new UnauthorizedException('Only creator can delete');
    return this.eventRepositoryService.deleteEventEntry(entryId);
  }

  async getOneEntry(entryId: number) {
    return this.eventRepositoryService.getEventEntry(entryId);
  }

  async getEntries(eventId: number, page: number) {
    return this.eventRepositoryService.getEntries(eventId, page);
  }
}
