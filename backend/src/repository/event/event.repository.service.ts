import { BadRequestException, Injectable } from '@nestjs/common';
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

  async deleteEvent(id: number) {
    return this.prismaService.event.delete({
      where: {
        id: id,
      },
    });
  }

  async updateEvent(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.prismaService.event.findUnique({
      where: {
        id: id,
      },
    });

    if (event === null) throw new BadRequestException('no such event with id');

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

    const locationId: number | null = await this.findLocationId(
      updateEventDto.location,
    );

    return this.prismaService.event.update({
      where: {
        id: id,
      },
      data: {
        description: updateEventDto.description,
        startingDate: updateEventDto.startingDate,
        locationId: locationId,
        endingDate: updateEventDto.endingDate,
      },
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
