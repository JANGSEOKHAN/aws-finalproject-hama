import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 요청에서 JWT 추출
      ignoreExpiration: false, // 만료된 토큰 거부
      secretOrKey: configService.get<string>('JWT_SECRET'), // 환경변수에서 시크릿 키 가져오기
    });
  }

  async validate(payload: any) {
    console.log('jwt payload', payload.sub);
    return { googleId: payload.sub };
  }
}
