import { Body, Controller, Post, BadRequestException, HttpCode, UseGuards, Req, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService, // Inject authservice
              ) {}

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
    return this.authService.login(user);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt')) // protect endpoint w/ jwt strategy
  getMe(@Req() req: any) {
    return req.user; // user data is added to request by JwtStrategy
  }
}
