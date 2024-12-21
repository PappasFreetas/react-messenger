import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    forwardRef(() => UserModule), // import user module to use UserService
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // use env variable for security
      signOptions: { expiresIn: '3600s' }, // token expiration
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService], // Export auth for use in other modules
})
export class AuthModule {}
