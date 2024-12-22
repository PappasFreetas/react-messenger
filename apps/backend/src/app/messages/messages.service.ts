import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
//import { UserModule } from '../user/user.module';
import { User } from '../user/user.entity';
import { plainToInstance } from 'class-transformer';
import { MessageDto} from './dto/message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) // inject message reposityory
    private readonly messageRepository: Repository<Message>,
  ) {}

  /**
   * Send a new message between users
   * @param sender - sender user
   * @param receiver - receiver user
   * @param content - message content
   * @returns created message
   */
  async sendMessage(
    sender: User,
    receiver: User,
    content: string,
  ): Promise<MessageDto> {
    // create new message instance
    const newMessage = this.messageRepository.create({
      sender,
      receiver,
      content,
    });

    // save message to the db
    const savedMessage = this.messageRepository.save(newMessage);

    // transform saved message into messageDto
    return plainToInstance(MessageDto, savedMessage, { excludeExtraneousValues: true})
  }

  /**
   * Fetch all messages between two users
   * @param user1
   * @param user2
   * @returns array of messages
   */
  async getMessagesBetweenUsers(
    user1: User,
    user2: User,
  ): Promise<MessageDto[]> {
    const messages = await this.messageRepository.find({
      where: [
        { sender: { id: user1.id }, receiver: { id: user2.id } },
        { sender: { id: user2.id }, receiver: { id: user1.id } },
      ],
      order: { createdAt: 'ASC' }, // sort messages by creation time
    });

    return plainToInstance(MessageDto, messages, { excludeExtraneousValues: true});
  }
}
