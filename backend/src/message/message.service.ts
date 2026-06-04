import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CreateImageDto } from '../images/dto/create-image.dto';
import { MessageRepositoryService } from '../repository/message/message.repository.service';
import { ImageService } from '../images/image.service';

@Injectable()
export class MessageService {
  constructor(
    private messageRepository: MessageRepositoryService,
    private imageService: ImageService,
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    const imageIds: number[] = await Promise.all(
      (createMessageDto.images ?? []).map((image: CreateImageDto) =>
        Promise.resolve(this.imageService.create(image)),
      ),
    ).then((images) => images.map((image) => image.id));
    return this.messageRepository.create(createMessageDto, imageIds);
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
