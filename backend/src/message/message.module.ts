import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ImageModule } from '../images/image.module';
import { GroupModule } from '../group/group.module';
import { MessageRepositoryModule } from '../repository/message/message.repository.module';

@Module({
  imports: [ImageModule, GroupModule, MessageRepositoryModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
