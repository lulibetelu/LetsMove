import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { GroupService } from '../group/group.service';
import { CreateImageDto } from '../images/dto/create-image.dto';
import { MessageService } from '../message/message.service';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { Message } from '../message/entities/message.entity';
@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  // todo: connect a un topic

  constructor(
    private jwtService: JwtService,
    private groupService: GroupService,
    private messageService: MessageService,
  ) {}
  private users = new Map<string, number>();

  //Socket<ListenEvents, EmitEvents, ServerSideEvents, SocketData>, solo cambio socket data
  handleConnection(client: Socket<any, any, any, SocketData>): void {
    const token = client.handshake.auth?.token as string | undefined;

    if (!token) {
      client.disconnect();
      return;
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      client.data.user = payload;
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket): void {
    console.log(`User disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinGroup')
  async handleJoinGroup(
    @ConnectedSocket() client: Socket<any, any, any, SocketData>,
    @MessageBody()
    groupId: number,
  ) {
    const userId: number = client.data.user.sub;

    const isMember: boolean | undefined = await this.groupService.isMember(
      userId,
      groupId,
    );
    if (!isMember) {
      client.emit('error', { message: 'usuario no pertence al grupo' });
      return;
    }
    await client.join(groupId.toString());
    client.emit('joinedGroup', { groupId });
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket<any, any, any, SocketData>,
    @MessageBody()
    messageData: MessageData,
  ) {
    const userId: number = client.data.user.sub;

    if (messageData.content.length === 0 && !messageData.images?.length) return;

    const createMessageDto: CreateMessageDto = {
      groupId: messageData.groupId,
      memberId: userId,
      content: messageData.content,
      images: messageData.images,
      sentDate: new Date(),
    };
    const createdMessage: Message = await this.messageService.create(
      createMessageDto,
      userId,
    );

    await this.groupService.markAsRead(userId, messageData.groupId);

    this.server
      .to(messageData.groupId.toString())
      .emit('newMessage', createdMessage);
  }
}

export interface JwtPayload {
  sub: number;
  email: string;
  username: string;
}

export interface SocketData {
  user: JwtPayload;
}

interface MessageData {
  groupId: number;
  content: string;
  images?: CreateImageDto[];
}
