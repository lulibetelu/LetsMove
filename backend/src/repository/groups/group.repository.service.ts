import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGroupDto } from '../../group/dto/create-group.dto';
import { Prisma } from '@prisma/client';
import { UpdateGroupDto } from '../../group/dto/update-group.dto';

@Injectable()
export class GroupRepositoryService {
  constructor(private prismaService: PrismaService) {}

  async create(createGroupDto: CreateGroupDto, imageId?: number) {
    const group = await this.prismaService.group.create({
      data: {
        name: createGroupDto.name,
        description: createGroupDto.description,
        ...(imageId ? { imageId } : {}),
      } as Prisma.GroupUncheckedCreateInput,
    });
    await this.updateMembers(group.id, createGroupDto.members);
    return group;
  }

  async findAll(userId: number) {
    const memberships = await this.prismaService.groupMember.findMany({
      where: { userId: userId },
      select: { groupId: true, lastReadMessageId: true },
    });

    const groupIds = memberships.map((m) => m.groupId);
    const groups = await this.prismaService.group.findMany({
      where: { id: { in: groupIds } },
    });

    const unreadCounts = await Promise.all(
      memberships.map(async (m) => {
        const count = await this.prismaService.message.count({
          where: {
            groupId: m.groupId,
            id: m.lastReadMessageId ? { gt: m.lastReadMessageId } : undefined,
          },
        });
        return { groupId: m.groupId, unreadCount: count };
      }),
    );

    const unreadMap = Object.fromEntries(
      unreadCounts.map(({ groupId, unreadCount }) => [groupId, unreadCount]),
    );

    return groups.map((group) => ({
      ...group,
      unreadCount: unreadMap[group.id] ?? 0,
    }));
  }

  async findOne(groupId: number) {
    return this.prismaService.group.findUnique({
      where: { id: groupId },
      include: {
        groupMembers: {
          select: {
            userId: true,
            isAdmin: true,
            lastReadMessageId: true,
          },
        },
      },
    });
  }

  async update(
    groupId: number,
    updateGroupDto: UpdateGroupDto,
    imageId?: number,
  ) {
    const updatedGroup = await this.prismaService.group.update({
      where: { id: groupId },
      data: {
        ...(updateGroupDto.name && { name: updateGroupDto.name }),
        ...(updateGroupDto.description && {
          description: updateGroupDto.description,
        }),
        ...(imageId ? { imageId } : {}),
      },
    });
    if (updateGroupDto.membersIdToRemove) {
      await this.deleteMembers(
        updatedGroup.id,
        updateGroupDto.membersIdToRemove,
      );
    }
    if (updateGroupDto.membersToUpdate) {
      await this.updateMembers(updatedGroup.id, updateGroupDto.membersToUpdate);
    }
    return updatedGroup;
  }

  async delete(groupId: number) {
    return this.prismaService.group.delete({
      where: {
        id: groupId,
      },
    });
  }

  async getMembers(groupId: number) {
    return this.prismaService.groupMember.findMany({
      where: {
        groupId: groupId,
      },
    });
  }

  async updateMembers(
    groupId: number,
    members: { memberId: number; isAdmin: boolean }[],
  ) {
    return Promise.all(
      members.map((member) =>
        this.prismaService.groupMember.upsert({
          where: {
            groupId_userId: {
              groupId: groupId,
              userId: member.memberId,
            },
          },
          update: {
            isAdmin: member.isAdmin,
          },
          create: {
            groupId: groupId,
            userId: member.memberId,
            isAdmin: member.isAdmin,
          },
        }),
      ),
    );
  }

  async deleteMembers(groupId: number, membersId: number[]) {
    return this.prismaService.groupMember.deleteMany({
      where: {
        groupId: groupId,
        userId: { in: membersId },
      },
    });
  }

  async markAsRead(userId: number, groupId: number) {
    const lastMessage = await this.prismaService.message.findFirst({
      where: { groupId },
      orderBy: { id: 'desc' },
      select: { id: true },
    });

    await this.prismaService.groupMember.update({
      where: { groupId_userId: { groupId, userId } },
      data: { lastReadMessageId: lastMessage?.id ?? 0 },
    });
  }
}
