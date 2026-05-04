import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventSignUpDto } from '../../event-sign-up/dto/create-event-sign-up.dto';

@Injectable()
export class EventSignUpRepositoryService {
  constructor(private prismaService: PrismaService) {
  }
  public create(dto: CreateEventSignUpDto){
    return this.prismaService.eventSignUp.create({
      data: {

      }
    })
  }
}