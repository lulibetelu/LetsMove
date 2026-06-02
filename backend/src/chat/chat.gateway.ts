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

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  // todo: connect a un topic

  private users = new Map<string, number>();

  handleConnection(client: Socket): void {
    console.log(`User connected`);
  }

  /**
  handleIdentity({token}){
    const userId = 5; //conseguir user id del jwt
    this.users.set(client.id, userId);
  }
**/

  handleDisconnect(client: Socket): void {
    console.log(`User disconnected: ${client.id}`);
  }

  /*  @SubscribeMessage('setUsername')
  handleSetUsername(
    @MessageBody() username: string,
    @ConnectedSocket() client: Socket,
  ): void {
    this.users.set(client.id, username);
    console.log(`${username} joined`);
    this.server.emit('userJoined', { userId: client.id, username });
  }

  @SubscribeMessage('messageSent')
  handleMessage(
    @MessageBody() payload: { text: string },
    @ConnectedSocket() client: Socket,
  ): void {
    this.server.emit('messageBroadcast', {
      userId: this.users.get(client.id),
      text: payload.text,
      timestamp: new Date(),
    });
    saveMessage({
      text:,
      from:,
      timestamp:
      recipient: groupId/personal
    })
  }*/
}
