import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupRepositoryService } from '../repository/groups/group.repository.service';
import { ImageService } from '../images/image.service';

@Injectable()
export class GroupService {
  constructor(
    private groupRepository: GroupRepositoryService,
    private imageService: ImageService,
  ) {}
  async create(createGroupDto: CreateGroupDto, userId: number) {
    if (createGroupDto.image) {
      const image = await this.imageService.create(createGroupDto.image);
      return this.groupRepository.create(createGroupDto, userId, image.id);
    }
    return this.groupRepository.create(createGroupDto, userId);
  }

  async findAll(userId: number) {
    const groups = await this.groupRepository.findAll(userId);
    if (!groups || groups.length === 0) {
      throw new NotFoundException("user doesn't have groups");
    }
    return groups;
  }

  async findOne(id: number, userId: number) {
    const group = await this.groupRepository.findOne(id);
    if (!group) throw new NotFoundException('group not found');

    const groupMembers = await this.groupRepository.getMembers(id);
    const membersId = groupMembers.map((member) => member.userId);
    if (!membersId.includes(userId))
      throw new UnauthorizedException('user not in group');

    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.groupRepository.findOne(id);
    if (!group) throw new NotFoundException('group not found');
    if (updateGroupDto.image) {
      const image = await this.imageService.create(updateGroupDto.image);
      return this.groupRepository.update(id, updateGroupDto, image.id);
    }
    return this.groupRepository.update(id, updateGroupDto);
  }

  async remove(id: number, userId: number) {
    const group = await this.groupRepository.findOne(id);
    if (!group) throw new NotFoundException('group not found');

    const groupMembers = await this.groupRepository.getMembers(id);
    const membersId = groupMembers.map((member) => member.userId);
    if (!membersId.includes(userId))
      throw new UnauthorizedException('user not in group');
    else {
      const user = groupMembers.find((member) => member.userId === userId);
      if (!user?.isAdmin)
        throw new UnauthorizedException('only admin can delete');
    }
    return this.groupRepository.delete(id);
  }
}
