import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { FriendsRepositoryService } from '../repository/friends/friends.repository.service';

@Injectable()
export class FriendsService {
  constructor(private friendsRepository: FriendsRepositoryService) {}

  async create(userId: number, createFriendDto: CreateFriendDto) {
    const exitsFriend1 = await this.friendsRepository.findUnique(
      userId,
      createFriendDto.friendId,
    );
    const exitsFriend2 = await this.friendsRepository.findUnique(
      createFriendDto.friendId,
      userId,
    );
    if (exitsFriend1.length != 0 || exitsFriend2.length != 0) {
      throw new Error('Friendship already exists');
    }
    return this.friendsRepository.create(userId, createFriendDto);
  }

  async findAll(userId: number) {
    return this.friendsRepository.findAll(userId);
  }

  async findOne(userId: number, friendId: number) {
    const try1 = this.friendsRepository.findUnique(userId, friendId);
    if (try1 != null) return try1;
    return this.friendsRepository.findUnique(friendId, userId);
  }

  async update(userId: number, updateFriendDto: UpdateFriendDto) {
    return this.friendsRepository.update(userId, updateFriendDto);
  }

  async remove(userId: number, friendId: number) {
    return this.friendsRepository.remove(userId, friendId);
  }
}
