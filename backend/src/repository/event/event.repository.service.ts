import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventDto } from '../../event/dto/create-event.dto';
import { EventType, Location } from '@prisma/client';

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
        throw new UnauthorizedException('event needs location');
      }
      locationId = null;
    } else {
      const location = await this.prismaService.location.findFirst({
        where: {
          location: createEventDto.location,
        },
      });
      locationId = location!.id;
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

}
