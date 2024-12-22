import { Exclude, Expose, Type } from 'class-transformer';
//import { User } from '../../user/user.entity';

/**
 * DTO for controlling the data returned in user responses
 */
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Exclude()
  password?: string;
}

/**
 * DTO for controlling data returned in message responses
 */
export class MessageDto {
  @Expose()
  id: number;

  @Expose()
  content: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => UserDto)
  sender: UserDto;

  @Expose()
  @Type(() => UserDto)
  receiver: UserDto;
}


