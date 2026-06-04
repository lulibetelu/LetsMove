import { CreateMessageDto } from '../dto/create-message.dto';

export class Message {
  groupId: number;
  content: string;
  memberId: number;
  date: Date;
  images: number[];
  constructor(
    createMessageDto: CreateMessageDto,
    imagesIds: number[],
    memberId: number,
  ) {
    this.groupId = createMessageDto.groupId;
    this.content = createMessageDto.content;
    this.memberId = memberId;
    this.date = createMessageDto.sentDate;
    this.images = imagesIds;
  }
}
