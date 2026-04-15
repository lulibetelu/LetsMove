import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { FriendsRepositoryService } from '../repository/friends/friends.repository.service';

@Injectable()
export class FriendsService {
  constructor(private friendsRepository: FriendsRepositoryService) {}

  async create(senderId: number, createFriendDto: CreateFriendDto) {
    //Con el OR de la query en repository, los dos ifs te traian cosas
    const exitsFriend1 = await this.friendsRepository.findUnique(
      senderId,
      createFriendDto.receiverId,
    );
    const exitsFriend2 = await this.friendsRepository.findUnique(
      createFriendDto.receiverId,
      senderId,
    );
    if (exitsFriend1.length != 0 || exitsFriend2.length != 0) {
      throw new BadRequestException('Friendship already exists');
    }
    return this.friendsRepository.create(senderId, createFriendDto);
  }

  async findAll(userId: number) {
    return this.friendsRepository.findAll(userId);
  }

  async findOne(sender: number, receiver: number) {
    const try1 = this.friendsRepository.findUnique(sender, receiver);
    if (try1 != null) return try1;
    return this.friendsRepository.findUnique(receiver, sender);
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
}
