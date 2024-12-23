import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { UserModule } from '../user/user.module';
import { MessagesGateway } from './messages.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]), // register message entity
    UserModule,
  ],
  providers: [MessagesService, MessagesGateway],
  controllers: [MessagesController]
})
export class MessagesModule {}
