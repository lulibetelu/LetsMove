import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventDto } from '../../event/dto/create-event.dto';
import { EventType, Location } from '@prisma/client';
import { UpdateEventDto } from '../../event/dto/update-event.dto';

@Injectable()
export class EventRepositoryService {
  constructor(private prismaService: PrismaService) {}

  async createEvent(hostId: number, createEventDto: CreateEventDto) {
    //Se puede mejorar
    let locationId: number | null;
    if (
      createEventDto.location === undefined ||
      createEventDto.location === null
    ) {
      if (createEventDto.type === 'InPerson') {
        throw new BadRequestException('event needs location');
      }
      locationId = null;
    } else {
      const location = await this.prismaService.location.findFirst({
        where: {
          location: createEventDto.location,
        },
      });
      if (location === null) throw new BadRequestException('no such location');
      locationId = location.id;
    }

    return this.prismaService.event.create({
      data: {
        hostId: hostId,
        title: createEventDto.title,
        description: createEventDto.description,
        startingDate: createEventDto.startingDate,
        locationId: locationId,
        endingDate: createEventDto.endingDate,
        isPrivate: createEventDto.isPrivate,
        eventType:
          createEventDto.type === 'Asynchronous'
            ? EventType.Asynchronous
            : EventType.InPerson,
      },
    });
  }

  async findAll() {
    return this.prismaService.event.findMany();
  }

  async findOneById(id: number) {
    return this.prismaService.event.findUnique({
      where: {
        id: id,
      },
    });
  }

  async deleteEvent(id: number, removerId: number) {
    const event = await this.prismaService.event.findUnique({
      where: {
        id: id,
      },
    });

    if (event === null) throw new BadRequestException('no such event');

    if (removerId !== event.hostId)
      throw new UnauthorizedException("cannot remove other user's event");

    return this.prismaService.event.delete({
      where: {
        id: id,
      },
    });
  }

  async updateEvent(
    eventId: number,
    modifierId: number,
    updateEventDto: UpdateEventDto,
  ) {
    const event = await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (event === null) throw new BadRequestException('no such event with id');

    if (modifierId !== event.hostId)
      throw new UnauthorizedException("cannot modify other user's event");

    if (
      event.eventType === 'InPerson' &&
      updateEventDto.endingDate !== undefined
    ) {
      throw new BadRequestException('in person events do not have ending date');
    }

    if (
      event.eventType === 'Asynchronous' &&
      updateEventDto.location !== undefined
    ) {
      throw new BadRequestException('asynchronous events do not have location');
    }

    const data: {
      description: UpdateEventDto['description'];
      startingDate: UpdateEventDto['startingDate'];
      endingDate: UpdateEventDto['endingDate'];
      locationId?: number | null;
    } = {
      description: updateEventDto.description,
      startingDate: updateEventDto.startingDate,
      endingDate: updateEventDto.endingDate,
    };

    if (updateEventDto.location !== undefined) {
      data.locationId = await this.findLocationId(updateEventDto.location);
    }

    return this.prismaService.event.update({
      where: {
        id: eventId,
      },
      data: data,
    });
  }

  private async findLocationId(locationName: string | undefined) {
    if (locationName === undefined) return null;

    const location = await this.prismaService.location.findFirst({
      where: {
        location: locationName,
      },
    });

    if (location === null) return null;

    return location.id;
  }
}
