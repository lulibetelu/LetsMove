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

@WebSocketGateway(4000, {
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

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() messageObj: holaMessage,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(messageObj);
    client.broadcast.emit('message', messageObj);
  }
}
type holaMessage = { hola: string };
