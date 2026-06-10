import { Module } from '@nestjs/common';
import { GroupModule } from '../group/group.module';
import { MessageModule } from '../message/message.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [GroupModule, MessageModule],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class ChatModule {}
