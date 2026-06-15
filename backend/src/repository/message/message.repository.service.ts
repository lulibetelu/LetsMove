import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMessageDto } from '../../message/dto/create-message.dto';

@Injectable()
export class MessageRepositoryService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createMessageDto: CreateMessageDto,
    imageIds: number[],
    userId: number,
  ) {
    const groupMember = await this.prismaService.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId: createMessageDto.groupId,
          userId: userId,
        },
      },
    });

    if (!groupMember)
      throw new NotFoundException('User is not a member of this group');

    const messageCreated = await this.prismaService.message.create({
      data: {
        groupId: createMessageDto.groupId,
        content: createMessageDto.content,
        groupMemberId: groupMember.id,
        date: createMessageDto.sentDate,
        ...(imageIds.length > 0 && {
          images: {
            create: imageIds.map((imageId) => ({
              imageId,
            })),
          },
        }),
      },
      include: {
        groupMember: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
        images: {
          include: {
            image: {
              select: { url: true },
            },
          },
        },
      },
    });
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
        images: {
          include: {
            image: {
              select: { url: true },
            },
          },
        },
      },
    });
  }
}
