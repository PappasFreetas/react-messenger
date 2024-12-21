import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService, // Dependency inj for user opereations
    private readonly jwtService: JwtService, // Dependency inj for JWT operations
  ) {}

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
  async login(user: User): Promise<{ token: string }> {
    const payload = { username: user.username, sub: user.id }; // Data to embed in token
    return { token: this.jwtService.sign(payload) }; // Sign and return token
  }

}
