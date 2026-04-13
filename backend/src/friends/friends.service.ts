import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { FriendsRepositoryService } from '../repository/friends/friends.repository.service';

@Injectable()
export class FriendsService {
  constructor(private friendsRepository: FriendsRepositoryService) {}

  create(userId: number, createFriendDto: CreateFriendDto) {
    const exitsFriend1 = this.friendsRepository.findUnique(
      userId,
      createFriendDto.friendId,
    );
    const exitsFriend2 = this.friendsRepository.findUnique(
      createFriendDto.friendId,
      userId,
    );
    if (exitsFriend1 != null || exitsFriend2 != null) {
      throw new Error('Friendship already exists');
    }
    return this.friendsRepository.create(userId, createFriendDto);
  }

  findAll(userId: number) {
    return this.friendsRepository.findAll(userId);
  }

  findOne(userId: number, friendId: number) {
    const try1 = this.friendsRepository.findUnique(userId, friendId);
    if (try1 != null) return try1;
    return this.friendsRepository.findUnique(friendId, userId);
  }

  update(userId: number, updateFriendDto: UpdateFriendDto) {
    return this.friendsRepository.update(userId, updateFriendDto);
  }

  remove(userId: number, friendId: number) {
    return this.friendsRepository.remove(userId, friendId);
  }
}
