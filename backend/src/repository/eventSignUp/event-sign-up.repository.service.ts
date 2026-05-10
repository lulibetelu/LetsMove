import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventSignUpDto } from '../../event-sign-up/dto/create-event-sign-up.dto';
import { UpdateEventSignUpDto } from '../../event-sign-up/dto/update-event-sign-up.dto';

@Injectable()
export class EventSignUpRepositoryService {
  constructor(private prismaService: PrismaService) {}
  public create(
    dto: CreateEventSignUpDto,
    userId: number,
    state: string,
    joinedAt: Date | undefined,
  ) {
    const data: any = {
      eventId: dto.eventId,
      userId: userId,
      state: state,
    };

    if (joinedAt) {
      data.joinedAt = joinedAt;
    }

    return this.prismaService.eventSignUp.create({ data });
  }
  public findAllFromUser(userId: number){
    return this.prismaService.eventSignUp.findMany({
      where: {
        userId: userId,
      },
    });
  }
  public findAllFromEvent(eventId: number){
    return this.prismaService.eventSignUp.findMany({
      where: {
        eventId: eventId,
      },
    });
  }
  public findOne(userId: number, eventId: number) {
    return this.prismaService.eventSignUp.findUnique({
      where: {
        userId_eventId: {
          userId: userId,
          eventId: eventId,
        },
      },
    });
  }
  public update(dto: UpdateEventSignUpDto) {
    return this.prismaService.eventSignUp.update({
      where: {
        userId_eventId: {
          userId: dto.userId,
          eventId: dto.eventId,
        },
      },
      data: {
        state: dto.state,
      },
    });
  }
  public remove(userId: number, eventId: number){
    return this.prismaService.eventSignUp.delete({
      where: {
        userId_eventId: {
          userId: userId,
          eventId: eventId,
        },
      },
    });
  }
}
