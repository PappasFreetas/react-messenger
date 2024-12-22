import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    @InjectRepository(User) private readonly userReposityory: Repository<User>,
  ) {}

  /**
   * Helper method to fetch a user by ID
   * @param userId - ID of user to fetch
   * @returns user entity if found
   * @throws NotFoundException if user is not found
   */
  private async fetchUserById(userId: number): Promise<User> {
    const user = await this.userReposityory.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user;
  }

  /**
   * Endpoint to send new message
   * @param senderId
   * @param receiverId
   * @param content
   * @returns created message
   */
  @Post('send')
  async sendMessage(
    @Body('sender') senderId: number,
    @Body('receiver') receiverId: number,
    @Body('content') content: string,
  ) {
    // fetch sender and receiver users from db
    const sender = await this.fetchUserById(senderId);
    const receiver = await this.fetchUserById(receiverId);

    // call service to send message
    return this.messagesService.sendMessage(sender, receiver, content);
  }

  /**
   * Endpoint to fetch messages between two users
   * @param user1Id
   * @param user2Id
   */
  @Get(':user1Id/:user2Id')
  async getMessagesBetweenUsers(
    @Param('user1Id') user1Id: number,
    @Param('user2Id') user2Id: number,
  ) {
    // fetch both users from db
    const user1 = await this.fetchUserById(user1Id);
    const user2 = await this.fetchUserById(user2Id);

    // call service to fetch messages
    return this.messagesService.getMessagesBetweenUsers(user1, user2);
  }


}
