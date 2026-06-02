import {
  BadRequestException,
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
    const creator = createGroupDto.members.find(
      (member) => member.memberId === userId,
    );
    if (!creator || !creator.isAdmin)
      throw new BadRequestException(
        'Group author must be in members list and must be admin',
      );
    if (createGroupDto.image) {
      const image = await this.imageService.create(createGroupDto.image);
      return this.groupRepository.create(createGroupDto, image.id);
    }
    return this.groupRepository.create(createGroupDto);
  }

  async findAll(userId: number) {
    return this.groupRepository.findAll(userId);
  }

  async findOne(id: number, userId: number) {
    const group = await this.groupRepository.findOne(id);
    if (!group) throw new NotFoundException('group not found');

    const membersId = group.groupMembers.map((member) => member.userId);
    if (!membersId.includes(userId))
      throw new UnauthorizedException('user not in group');

    return group;
  }

  async update(
    groupId: number,
    updateGroupDto: UpdateGroupDto,
    userId: number,
  ) {
    const group = await this.groupRepository.findOne(groupId);
    if (!group) throw new NotFoundException('group not found');

    const groupMembers = await this.groupRepository.getMembers(groupId);
    if (!groupMembers.find((member) => member.userId === userId)?.isAdmin)
      throw new UnauthorizedException('only admin can edit group');

    if (updateGroupDto.image) {
      const image = await this.imageService.create(updateGroupDto.image);
      return this.groupRepository.update(groupId, updateGroupDto, image.id);
    }

    return this.groupRepository.update(groupId, updateGroupDto);
  }

  async remove(groupId: number, userId: number) {
    const group = await this.groupRepository.findOne(groupId);
    if (!group) throw new NotFoundException('group not found');

    const groupMembers = await this.groupRepository.getMembers(groupId);
    if (!groupMembers.find((member) => member.userId === userId)?.isAdmin)
      throw new UnauthorizedException('only admin can delete group');

    return this.groupRepository.delete(groupId);
  }
}
