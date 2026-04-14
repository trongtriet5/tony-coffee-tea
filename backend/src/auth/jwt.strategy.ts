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
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret && process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET environment variable is required in production');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret || 'dev-secret-do-not-use-in-production',
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
