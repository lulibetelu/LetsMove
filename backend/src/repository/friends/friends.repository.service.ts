import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from '../../friends/dto/create-friend.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateFriendDto } from '../../friends/dto/update-friend.dto';

@Injectable()
export class FriendsRepositoryService {
  constructor(private prismaService: PrismaService) {}
  async create(userId: number, createFriendDto: CreateFriendDto) {
    await this.prismaService.friends.create({
      data: {
        userId1: userId,
        userId2: createFriendDto.friendId,
        state: 'Requested',
      },
    });
  }
  async findAll(userId: number) {
    await this.prismaService.friends.findMany({
      where: {
        OR: [{ userId1: userId }, { userId2: userId }],
      },
    });
  }
  // a pesar de que sea un findUnique uso findMany porque cuando creo una amistad me fijo que no exista otra
  // asi que no puede pasar que me devuelva dos tuplas
  async findUnique(userId: number, friendId: number) {
    await this.prismaService.friends.findMany({
      where: {
        OR: [
          { userId1: userId, userId2: friendId },
          { userId2: userId, userId1: friendId },
        ],
      },
    });
  }
  async update(userId: number, updateFriendDto: UpdateFriendDto){
    await this.prismaService.friends.updateMany({
      where: {
        OR: [
          { userId1: userId, userId2: updateFriendDto.friendId },
          { userId2: userId, userId1: updateFriendDto.friendId },
        ],
      },
      data: {
        state: updateFriendDto.state,
      },
    });
  }
  async remove(userId: number, friendId: number) {
    await this.prismaService.friends.deleteMany({
      where: {
        OR: [
          { userId1: userId, userId2: friendId },
          { userId2: userId, userId1: friendId },
        ],
      },
    });
  }
}