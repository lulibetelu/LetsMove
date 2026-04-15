import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from '../../friends/dto/create-friend.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateFriendDto } from '../../friends/dto/update-friend.dto';

@Injectable()
export class FriendsRepositoryService {
  constructor(private prismaService: PrismaService) {}
  async create(userId: number, createFriendDto: CreateFriendDto) {
    return this.prismaService.friends.create({
      data: {
        sender: userId,
        receiver: createFriendDto.receiverId,
        state: 'Requested',
      },
    });
  }
  async findAll(userId: number) {
    return this.prismaService.friends.findMany({
      where: {
        receiver: userId,
      },
    });
  }
  // a pesar de que sea un findUnique uso findMany porque cuando creo una amistad me fijo que no exista otra
  // asi que no puede pasar que me devuelva dos tuplas
  async findUnique(userId: number, friendId: number) {
    return this.prismaService.friends.findMany({
      where: {
        //Saque el or donde van los IDs al reves. El checkeo del create medio que ya me da tuplas única
        sender: userId,
        receiver: friendId,
      },
    });
  }
  async update(userId: number, updateFriendDto: UpdateFriendDto) {
    return this.prismaService.friends.updateMany({
      where: {
        OR: [
          { sender: userId, receiver: updateFriendDto.friendId },
          { receiver: userId, sender: updateFriendDto.friendId },
        ],
      },
      data: {
        state: updateFriendDto.state,
      },
    });
  }
  async remove(userId: number, friendId: number) {
    return this.prismaService.friends.deleteMany({
      where: {
        OR: [
          { sender: userId, receiver: friendId },
          { receiver: userId, sender: friendId },
        ],
      },
    });
  }
}
