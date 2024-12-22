import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.entity'

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { eager: true})
  sender: User; // many messages can have the same sender

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  receiver: User; // many messages can have same receiver

  @Column()
  content: string; // message content

  @CreateDateColumn() // automatic set creation timestamp
  createdAt: Date;
}
