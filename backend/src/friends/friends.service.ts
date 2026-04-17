import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { FriendsRepositoryService } from '../repository/friends/friends.repository.service';

@Injectable()
export class FriendsService {
  constructor(private friendsRepository: FriendsRepositoryService) {}

  async create(senderId: number, createFriendDto: CreateFriendDto) {
    //Con el OR de la query en repository, los dos ifs te traian cosas
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
    return this.friendsRepository.findUnique(sender, receiver);
  }

  async update(userId: number, updateFriendDto: UpdateFriendDto) {
    //Si existe la tupla que quiero updatear, updateo.
    const findFriendShipRequest = await this.friendsRepository.findUnique(
      updateFriendDto.friendId,
      userId,
    );
    if (findFriendShipRequest.length === 0) {
      throw new BadRequestException(
        'Only receiver can update the friendship request',
      );
    }
    return this.friendsRepository.update(userId, updateFriendDto);
  }

  async remove(userId: number, receiver: number) {
    return this.friendsRepository.remove(userId, receiver);
  }

  async findAllRequested(userId: number) {
    return this.friendsRepository.findAllRequested(userId);
  }
}
