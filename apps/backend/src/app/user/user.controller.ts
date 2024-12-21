import { Body, Controller, Post, BadRequestException, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() body: { email: string; password: string; username: string }
  ): Promise<User> {
    const existingUser = await this.userService.findByEmail(body.email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }
    return this.userService.register(body.email, body.password, body.username);
  }

  @Post('login')
  @HttpCode(200) // setting status code to 200, default post is 201
  async login(
    @Body() body: { email: string; password: string }
  ): Promise<{ token: string }> {
    const user = await this.userService.validateUser(body.email, body.password);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    // generate a token - TBD implementing JWTs
    return { token: 'token' }; // replace with real JWT
  }
}
