import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

interface JwtPayload {
  username: string;
  sub: string;
  role: string;
  branch_id: string | null;
}

interface ValidatedUser {
  id: string;
  username: string;
  role: string;
  branch_id: string | null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'SECRET_KEY',
    });
  }

  async validate(payload: JwtPayload): Promise<ValidatedUser> {
    return {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
      branch_id: payload.branch_id,
    };
  }
}
