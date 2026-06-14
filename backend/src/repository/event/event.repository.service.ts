import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventDto } from '../../event/dto/create-event.dto';
import { EventType } from '@prisma/client';
import { UpdateEventDto } from '../../event/dto/update-event.dto';
import { CreateEventEntryDto } from '../../eventEntry/dto/create-event-entry-dto';
import { EventSignUpRepositoryService } from '../eventSignUp/event-sign-up.repository.service';
import { EventSignUp } from '../../event-sign-up/entities/event-sign-up.entity';
import { FilterEventDto } from '../../event/dto/filter-event.dto';

@Injectable()
export class EventRepositoryService {
  constructor(
    private prismaService: PrismaService,
    private eventSignupRepositoryService: EventSignUpRepositoryService,
  ) {}

  async createEvent(
    hostId: number,
    createEventDto: CreateEventDto,
    image?: { id: number; description?: string },
  ) {
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
    if (!createEventDto.sportName)
      throw new BadRequestException('sport name is missing');

    const sport = await this.prismaService.sport.findUnique({
      where: {
        name: createEventDto.sportName,
      },
    });

    if (!sport) throw new BadRequestException('no such sport');

    const event = await this.prismaService.event.create({
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
        sportId: sport.id,
      },
    });

    if (image) {
      await this.prismaService.imageEvent.create({
        data: {
          eventId: event.id,
          imageId: image.id,
          description: image.description!,
        },
      });
    }

    return event;
  }

  async findAll(requesterId: number) {
    return this.prismaService.event.findMany({
      include: {
        imageEvents: {
          include: {
            image: {
              select: { id: true, url: true },
            },
          },
        },
        host: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        location: true,
      },
    });
  }

  async findOneById(id: number) {
    return this.prismaService.event.findUnique({
      where: {
        id: id,
      },
      include: {
        host: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        imageEvents: {
          include: {
            image: {
              select: { id: true, url: true },
            },
          },
        },
        location: true,
        // chat: true,
      },
    });
  }

  async findAllFromUser(userId: number) {
    return this.prismaService.event.findMany({
      where: {
        hostId: userId,
      },
      include: {
        host: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        imageEvents: {
          include: {
            image: {
              select: { id: true, url: true },
            },
          },
        },
        location: true,
        // chat: true,
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
    images: { id: number; description?: string }[],
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
      isPrivate: boolean | undefined;
    } = {
      description: updateEventDto.description,
      startingDate: updateEventDto.startingDate,
      endingDate: updateEventDto.endingDate,
      isPrivate: updateEventDto.isPrivate,
    };

    if (updateEventDto.location !== undefined) {
      data.locationId = await this.findLocationId(updateEventDto.location);
    }

    const newEvent = await this.prismaService.event.update({
      where: {
        id: eventId,
      },
      data: data,
    });

    if (images.length > 0) {
      await this.prismaService.imageEvent.createMany({
        data: images.map(({ id, description }) => ({
          eventId: newEvent.id,
          imageId: id,
          description: description!,
        })),
      });
    }

    return newEvent;
  }

  async findLimited(page: number, filter: FilterEventDto = {}) {
    const titleClause = filter.title
      ? {
          title: {
            contains: filter.title,
            mode: 'insensitive' as const,
          },
        }
      : {};

    const hostClause = filter.host
      ? {
          host: {
            is: {
              username: {
                contains: filter.host,
                mode: 'insensitive' as const,
              },
            },
          },
        }
      : {};

    const sportClause = filter.sport
      ? {
          sport: {
            is: {
              name: {
                contains: filter.sport,
                mode: 'insensitive' as const,
              },
            },
          },
        }
      : {};

    const savedClause = filter.saved
      ? {
          savedEvents: {
            some: {
              userId: filter.saved,
            },
          },
        }
      : {};

    const joinedClause = filter.joined
      ? {
          OR: [
            {
              eventSignUp: {
                some: {
                  userId: filter.joined,
                },
              },
            },
            {
              hostId: filter.joined,
            },
          ],
        }
      : {};

    return this.prismaService.event.findMany({
      where: {
        ...titleClause,
        ...hostClause,
        ...sportClause,
        ...savedClause,
        ...joinedClause,
      },
      include: {
        host: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        imageEvents: {
          include: {
            image: {
              select: { id: true, url: true },
            },
          },
        },
        location: true,
        sport: {
          select: {
            id: true,
            name: true,
          },
        },
        // chat: true,
      },
      take: 15,
      skip: (page - 1) * 15,
    });
  }

  async findFeed(userId: number, page: number) {
    const pageSize = 15;

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        preferences: { select: { sportId: true } },
        homeLocation: true,
      },
    });

    const preferredSportIds = new Set(
      user?.preferences.map((p) => p.sportId) ?? [],
    );
    const userLoc = user?.homeLocation;

    const BATCH_SIZE = 500;
    const events = await this.prismaService.event.findMany({
      include: {
        host: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        imageEvents: {
          include: {
            image: {
              select: { id: true, url: true },
            },
          },
        },
        location: true,
        sport: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: BATCH_SIZE,
    });

    const scored = events.map((event) => {
      const sportMatch = preferredSportIds.has(event.sportId) ? 1 : 0;

      let proximityBonus = 0;
      let distanceKm: number | null = null;
      if (userLoc && event.location) {
        distanceKm = this.haversine(
          userLoc.latitude,
          userLoc.longitude,
          event.location.latitude,
          event.location.longitude,
        );
        proximityBonus = 1 / (1 + distanceKm / 50);
      }

      const daysFromCreation = event.createdAt
        ? (Date.now() - event.createdAt.getTime()) / (1000 * 60 * 60 * 24)
        : 0;
      const recencyBonus = 1 / (1 + daysFromCreation / 30);

      const score = sportMatch * 50 + proximityBonus * 50 + recencyBonus * 10;

      return { ...event, score, distanceKm };
    });

    scored.sort((a, b) => b.score - a.score);

    const start = (page - 1) * pageSize;
    return scored.slice(start, start + pageSize);
  }

  private haversine(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371;
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
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

  async findEventsUserParticipates(requesterId: number, page: number) {
    const signUpLists: EventSignUp[] =
      await this.eventSignupRepositoryService.findAllFromUser(requesterId);

    const idList: number[] = signUpLists.map((signUp) => signUp.eventId);

    return this.prismaService.event.findMany({
      where: {
        OR: [{ id: { in: idList } }, { hostId: requesterId }],
      },
      include: {
        host: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      take: 10,
      skip: (page - 1) * 10,
    });
  }
  async createEventEntry(
    userId: number,
    eventEntryDto: CreateEventEntryDto,
    imageIds: number[],
  ) {
    const eventEntry = await this.prismaService.eventEntry.create({
      data: {
        eventId: eventEntryDto.eventId,
        userId: userId,
        content: eventEntryDto.content,
      },
    });

    if (imageIds.length > 0) {
      await this.prismaService.imageEntry.createMany({
        data: imageIds.map((imageId) => ({
          imageId,
          entryId: eventEntry.id,
        })),
      });
    }

    return eventEntry;
  }

  async getEventEntry(entryId: number) {
    return this.prismaService.eventEntry.findUnique({
      where: {
        id: entryId,
      },
      include: {
        images: {
          include: {
            image: {
              select: { id: true, url: true },
            },
          },
        },
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async getEntries(eventId: number, page: number) {
    return this.prismaService.eventEntry.findMany({
      where: {
        eventId: eventId,
      },
      include: {
        images: {
          include: {
            image: {
              select: { id: true, url: true },
            },
          },
        },
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      take: 10,
      skip: (page - 1) * 10,
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteEventEntry(entryId: number) {
    return this.prismaService.eventEntry.delete({
      where: {
        id: entryId,
      },
    });
  }

  async isEventMember(eventId: number, userId: number): Promise<boolean> {
    const event = await this.prismaService.event.findUnique({
      where: { id: eventId },
    });
    if (!event) return false;
    if (event.hostId === userId) return true;

    const signUps =
      await this.eventSignupRepositoryService.findAllFromEvent(eventId);
    return signUps.some(
      (signUp) => signUp.userId === userId && signUp.state === 'Accepted',
    );
  }

  async addGalleryImage(eventId: number, imageId: number) {
    return this.prismaService.imageEvent.create({
      data: {
        eventId,
        imageId,
        description: 'Gallery',
      },
      include: {
        image: {
          select: { id: true, url: true },
        },
      },
    });
  }

  async getGalleryImages(eventId: number) {
    return this.prismaService.imageEvent.findMany({
      where: {
        eventId,
        description: 'Gallery',
      },
      include: {
        image: {
          select: { id: true, url: true },
        },
      },
      orderBy: { id: 'desc' },
    });
  }
}
