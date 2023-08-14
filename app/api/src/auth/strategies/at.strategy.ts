import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types';
import { Request } from 'express';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        AtStrategy.extractJwt,
      ]),
      secretOrKey: process.env.AT_TOKEN,
    });
  }

  private static extractJwt(req: Request): string | null {
    console.log(req.cookies.token);
    if (
      req.cookies &&
      'token' in req.cookies &&
      req.cookies.user_token.length > 0
    ) {
      return req.cookies.user_token;
    }
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
