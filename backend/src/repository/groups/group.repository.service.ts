import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGroupDto } from '../../group/dto/create-group.dto';
import { Prisma } from '@prisma/client';
import { UpdateGroupDto } from '../../group/dto/update-group.dto';
import { CreateImageDto } from '../../images/dto/create-image.dto';

@Injectable()
export class GroupRepositoryService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createGroupDto: CreateGroupDto,
    userId: number,
    imageId?: number,
  ) {
    const group = await this.prismaService.group.create({
      data: {
        name: createGroupDto.title,
        description: createGroupDto.description,
        ...(imageId ? { imageId } : {}),
      } as Prisma.GroupUncheckedCreateInput,
    });
    await Promise.all(
      createGroupDto.members.map(async (memberId) => {
        await this.prismaService.groupMember.create({
          data: {
            userId: memberId,
            groupId: group.id,
            isAdmin: memberId === userId,
          },
        });
      }),
    );
    return group;
  }

  async findAll(userId: number) {
    const groups = await this.prismaService.groupMember.findMany({
      where: { userId: userId },
      select: { groupId: true },
    });
    const groupIds = groups.map((g) => g.groupId);
    return this.prismaService.group.findMany({
      where: {
        id: {
          in: groupIds,
        },
      },
    });
  }

  async findOne(groupId: number) {
    return this.prismaService.group.findUnique({
      where: { id: groupId },
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
        ...(updateGroupDto.title && { name: updateGroupDto.title }),
        ...(updateGroupDto.description && {
          description: updateGroupDto.description,
        }),
        ...(imageId ? { imageId } : {}),
      },
    });
    if (updateGroupDto.members) {
      const admins = await this.prismaService.groupMember.findMany({
        where: {
          groupId: updatedGroup.id,
          isAdmin: true,
        },
      });
      const adminsId = admins.map((admin) => admin.userId);
      await Promise.all(
        updateGroupDto.members.map(async (memberId) => {
          await this.prismaService.groupMember.create({
            data: {
              userId: memberId,
              groupId: updatedGroup.id,
              isAdmin: adminsId.includes(memberId),
            },
          });
        }),
      );
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
}
