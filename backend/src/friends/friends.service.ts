import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { FriendsRepositoryService } from '../repository/friends/friends.repository.service';

@Injectable()
export class FriendsService {
  constructor(private friendsRepository: FriendsRepositoryService) {}

  async create(senderId: number, createFriendDto: CreateFriendDto) {
    const exitsFriendship = await this.friendsRepository.findUnique(
      senderId,
      createFriendDto.receiverId,
    );
    if (exitsFriendship.length === 1) {
      throw new BadRequestException('Friendship already exists');
    } else if (exitsFriendship.length === 0) {
      return this.friendsRepository.create(senderId, createFriendDto);
    } else {
      throw new Error();
    }
  }

  async findAll(userId: number) {
    return this.friendsRepository.findAll(userId);
  }

  async findOne(sender: number, receiver: number) {
    const friendship = await this.friendsRepository.findUnique(
      sender,
      receiver,
    );
    if (friendship.length === 0) {
      throw new NotFoundException("Friendship doesn't exist");
    }
    return friendship;
  }

  async update(userId: number, updateFriendDto: UpdateFriendDto) {
    const findFriendShipRequest = await this.friendsRepository.findUnique(
      updateFriendDto.friendId,
      userId,
    );
    if (findFriendShipRequest.length === 0) {
      throw new BadRequestException(
        'Only receiver can update the friendship request',
      );
    }
    if (updateFriendDto.state === 'Rejected') {
      return this.friendsRepository.remove(userId, updateFriendDto.friendId);
    }
    return this.friendsRepository.update(userId, updateFriendDto);
  }

  async remove(userId: number, receiver: number) {
    const friendshipRemoved = await this.friendsRepository.remove(
      userId,
      receiver,
    );
    if (!friendshipRemoved) {
      throw new NotFoundException(
        "Tried to remove friendship that didn't exist",
      );
    }
    return friendshipRemoved;
  }

  async findAllRequested(userId: number) {
    return this.friendsRepository.findAllRequested(userId);
  }
}
