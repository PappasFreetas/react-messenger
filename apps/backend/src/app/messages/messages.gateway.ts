import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { MessageDto } from './dto/message.dto';
import { plainToInstance } from 'class-transformer';

@WebSocketGateway({ cors: { origin: '*' } }) // allow cross-origin
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messageService: MessagesService) {}

  // WebSocket server instance
  @WebSocketServer()
  server: Server;

  // track connected clients
  private clients: Record<string, Socket> = {};

  /**
   * Handle new client connection
   * @param client - connected client
   */
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.clients[client.id] = client;
  }

  /**
   * Handle client disconnection
   * @param client - disconnected client
   */
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    delete this.clients[client.id];
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: { sender: number; receiver: number; content: string }) {
    // use messageService to save message in the db
    const savedMessage = await this.messageService.sendMessage(
      { id: payload.sender } as any, // simulate sender user entity
      { id: payload.receiver} as any, // simulate receiver user entity
      payload.content,
    );

    // transform message into DTO
    const messageDto = plainToInstance(MessageDto, savedMessage, { excludeExtraneousValues: true});

    // broadcast message to the receiver
    this.server.emit(`message:${payload.receiver}`, messageDto);

    // also send message back to sender
    client.emit(`message:${payload.sender}`, messageDto);
  }
}
