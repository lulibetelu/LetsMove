import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventRepositoryService } from '../repository/event/event.repository.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ImageService } from '../images/image.service';

@Injectable()
export class EventService {
  constructor(
    private eventRepositoryService: EventRepositoryService,
    private imageService: ImageService,
  ) {}
  async create(hostId: number, createEventDto: CreateEventDto) {
    if (createEventDto.images != null && !createEventDto.imageDescription) {
      throw new BadRequestException();
    }

    const imageIds = await Promise.all(
      (createEventDto.images ?? []).map((image) =>
        Promise.resolve(this.imageService.create(image)),
      ),
    ).then((images) => images.map((image) => image.id));

    return await this.eventRepositoryService.createEvent(
      hostId,
      createEventDto,
      imageIds,
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
