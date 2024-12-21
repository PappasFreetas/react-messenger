import {
  Controller,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

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
}
