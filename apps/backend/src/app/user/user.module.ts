import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([User]), // register user entity
  forwardRef(() => AuthModule), // import authmodule to use authservice
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule], // Export service if other modules need it
})
export class UserModule {}
