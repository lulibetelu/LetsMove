import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SavedEventRepositoryService {
  constructor(private prismaService: PrismaService) {}

  create(userId: number, eventId: number) {
    return this.prismaService.savedEvent.create({
      data: { userId, eventId },
    });
  }

  remove(userId: number, eventId: number) {
    return this.prismaService.savedEvent.delete({
      where: {
        userId_eventId: { userId, eventId },
      },
    });
  }

  findAllFromUser(userId: number) {
    return this.prismaService.savedEvent.findMany({
      where: { userId },
    });
  }

  findOne(userId: number, eventId: number) {
    return this.prismaService.savedEvent.findUnique({
      where: {
        userId_eventId: { userId, eventId },
      },
    });
  }
}
