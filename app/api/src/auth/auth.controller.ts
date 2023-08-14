import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos';
import { Tokens } from './types';
import { RtGuard } from './common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';
import { RegisterUserDto } from './dtos/registerUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: RegisterUserDto): Promise<Tokens> {
    console.log(dto);
    return this.authService.signup(dto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: AuthDto,
  ): Promise<Tokens> {
    return this.authService.signin(dto, res);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @GetCurrentUserId() userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    return this.authService.logout(userId, res);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
