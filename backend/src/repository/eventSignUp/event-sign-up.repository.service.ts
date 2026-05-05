import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventSignUpDto } from '../../event-sign-up/dto/create-event-sign-up.dto';

@Injectable()
export class EventSignUpRepositoryService {
  constructor(private prismaService: PrismaService) {}
  public create(
    dto: CreateEventSignUpDto,
    userId: number,
    state: string,
    joinedAt?: Date,
  ) {
    return this.prismaService.eventSignUp.create({
      data: {
        eventId: dto.eventId,
        userId: userId,
        state: state,
        joinedAt: joinedAt,
      },
    });
  }
}
