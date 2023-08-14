import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dtos/registerUser.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(dto: RegisterUserDto): Promise<Tokens> {
    const hashedPassword = await this.hashData(dto.password);

    const newUser = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
      },
    });

    const tokens = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.username,
    );
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async signin(dto: AuthDto, res: any): Promise<Tokens> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email, user.username);
    await this.updateRtHash(user.id, tokens.refresh_token);

    res.cookie('token', tokens.access_token);
    res.cookie('user_token', tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number, res: any) {
    res.clearCookie('user_token');
    res.clearCookie('token');

    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }

  async refreshTokens(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(rt, user.hashedRt);

    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email, user.username);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(
    userId: number,
    email: string,
    username: string,
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.AT_TOKEN,
          expiresIn: 60 * 20,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          username,
        },
        {
          secret: process.env.RT_TOKEN,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }
}
