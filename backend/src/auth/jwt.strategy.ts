import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY', // Should be in env in real app
    });
  }

  async validate(payload: any) {
    return { 
      id: payload.sub, 
      username: payload.username, 
      role: payload.role, 
      branch_id: payload.branch_id 
    };
  }
}
