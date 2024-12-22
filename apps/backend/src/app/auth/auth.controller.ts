import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Handles user registration
   * @param createUserDto - Data transfer object containing user details
   * @returns success message or an error
   */
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      // Call auth service to handle registration logic
      return await this.authService.register(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   *
   * @param loginDto - email and password
   * @returns access token if login is successful
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
