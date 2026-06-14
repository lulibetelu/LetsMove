import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventRepositoryService } from '../repository/event/event.repository.service';
import { FilterEventDto } from './dto/filter-event.dto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ImageService } from '../images/image.service';
import { CreateImageDto } from '../images/dto/create-image.dto';

@Injectable()
export class EventService {
  constructor(
    private eventRepositoryService: EventRepositoryService,
    private imageService: ImageService,
  ) {}
  async create(hostId: number, createEventDto: CreateEventDto) {
    let image: { id: number; description?: string } | undefined;

    if (createEventDto.coverImage && !createEventDto.coverImage.description) {
      throw new BadRequestException('Cada imagen debe tener una descripción');
    }

    if (createEventDto.coverImage) {
      const created = await this.imageService.create(createEventDto.coverImage);
      image = {
        id: created.id,
        description: createEventDto.coverImage.description,
      };
    }

    return await this.eventRepositoryService.createEvent(
      hostId,
      createEventDto,
      image,
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
    if (updateEventDto.images?.some((image) => !image.description)) {
      throw new BadRequestException('Cada imagen debe tener una descripción');
    }
    const images = await Promise.all(
      (updateEventDto.images ?? []).map((image) =>
        Promise.resolve(
          this.imageService.create(image).then((created) => ({
            id: created.id,
            description: image.description,
          })),
        ),
      ),
    );
    return await this.eventRepositoryService.updateEvent(
      eventId,
      modifierId,
      updateEventDto,
      images,
    );
  }

  async findLimited(page: number, filters: FilterEventDto) {
    return this.eventRepositoryService.findLimited(page, filters);
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

  async addGalleryImage(
    eventId: number,
    userId: number,
    imageDto: CreateImageDto,
  ) {
    const isMember = await this.eventRepositoryService.isEventMember(
      eventId,
      userId,
    );
    if (!isMember)
      throw new UnauthorizedException('Must be a member to add gallery images');

    const image = await this.imageService.create(imageDto);
    return this.eventRepositoryService.addGalleryImage(eventId, image.id);
  }

  async getGalleryImages(eventId: number) {
    return this.eventRepositoryService.getGalleryImages(eventId);
  }
}
