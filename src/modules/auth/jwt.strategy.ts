import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  validate(payload: {
    sub: number;
    email: string;
    roleId: number;
    organizationId: number;
  }) {
    return {
      id: payload.sub,
      email: payload.email,
      roleId: payload.roleId,
      organizationId: payload.organizationId,
    };
  }
}
