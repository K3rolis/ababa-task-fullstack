import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtPayload } from '../types';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        RtStrategy.extractJwt,
      ]),
      secretOrKey: process.env.RT_TOKEN,
      passReqToCallback: true,
    });
  }

  private static extractJwt(req: Request): string | null {
    if (
      req.cookies &&
      'user_token' in req.cookies &&
      req.cookies.user_token.length > 0
    ) {
      return req.cookies.user_token;
    }
  }

  validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

    return {
      ...payload,
      refreshToken,
    };
  }
}
