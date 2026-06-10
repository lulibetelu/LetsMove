import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateImageDto } from '../images/dto/create-image.dto';
import { MessageRepositoryService } from '../repository/message/message.repository.service';
import { ImageService } from '../images/image.service';
import { GroupService } from '../group/group.service';

@Injectable()
export class MessageService {
  constructor(
    private messageRepository: MessageRepositoryService,
    private imageService: ImageService,
    private groupService: GroupService,
  ) {}
  async create(createMessageDto: CreateMessageDto, userId: number) {
    //Verificar que exista el group
    const group = await this.groupService.findOne(
      createMessageDto.groupId,
      userId,
    );

    if (!group) throw new NotFoundException();

    // La parte the images
    const imageIds: number[] = await Promise.all(
      (createMessageDto.images ?? []).map((image: CreateImageDto) =>
        Promise.resolve(this.imageService.create(image)),
      ),
    ).then((images) => images.map((image) => image.id));

    return this.messageRepository.create(createMessageDto, imageIds, userId);
  }

  findAll(groupId: number) {
    return this.messageRepository.findAll(groupId);
  }
}
