import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMessageDto } from '../../message/dto/create-message.dto';

@Injectable()
export class MessageRepositoryService {
  constructor(private prismaService: PrismaService) {}

  async create(createMessageDto: CreateMessageDto, imageIds: number[]) {
    const messageCreated = await this.prismaService.message.create({
      data: {
        groupId: createMessageDto.groupId,
        content: createMessageDto.content,
        groupMemberId: createMessageDto.memberId,
        date: createMessageDto.sentDate,
      },
      include: {
        groupMember: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
      },
    });

    if (imageIds.length > 0) {
      await this.prismaService.imageMessage.createMany({
        data: imageIds.map((imageId) => ({
          messageId: messageCreated.id,
          imageId,
        })),
      });
    }
    return messageCreated;
  }

  async findAll(groupId: number) {
    return this.prismaService.message.findMany({
      where: {
        groupId: groupId,
      },
      include: {
        groupMember: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
      },
    });
  }
}
