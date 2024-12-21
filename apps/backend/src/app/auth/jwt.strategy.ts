import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from auth header
      ignoreExpiration: false, // reject expired tokens
      secretOrKey: process.env.JWT_SECRET || 'secretKey', // use same secret as in jwt module
    });
  }

  /**
   * Validate JWT payload
   * @param payload - decoded JWT
   * @returns payload if valid
   */
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username} // attach data to request object
  }
}
