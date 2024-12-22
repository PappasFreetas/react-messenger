import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService, // Dependency inj for user opereations
    private readonly jwtService: JwtService, // Dependency inj for JWT operations
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Handles user registration
   * @param createUserDto - user data from controller
   * @returns success message
   */
  async register(createUserDto: CreateUserDto): Promise<{ message: string}> {
    const { email, password } = createUserDto;

    // check if user already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save new user
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);
    return { message: 'User created successfully' };
  }

  /**
   * validates a user by email and password
   * @param email - user's email
   * @param password - user's password
   * @returns The user if validation succeeds; null otherwise.
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    return this.userService.validateUser(email, password);
  }

  /**
   * Generates a JWT for the given user.
   * @param user - User who JWT is generated for
   * @returns Object containing JWT
   */
  async login({ email, password }: LoginDto): Promise<{ accessToken: string, user: User }> {
    // look up user in the db by email
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      // if no user is found, throw unauthorizedException
      throw new UnauthorizedException('Invalid credentials');
    }

    // compare provided password with hashed password in db
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // if password is incorrect throw UnauthorizedException
      throw new UnauthorizedException('Invalid credentials');
    }

    // generate payload for JWT
    const payload = { sub: user.id, email: user.email }; // sub usually stands for subject

    // sign JWT
    const token = this.jwtService.sign(payload);

    // return token and user info
    return { accessToken: token, user}
  }

}
