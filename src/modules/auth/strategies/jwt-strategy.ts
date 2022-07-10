import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        const { secret, issuer } = configService.get('jwt');
        super({
            jwtFromRequest: ExtractJwt.fromHeader('accesstoken') || ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: secret,
            issuer,
        });
    }
    validate(payload: any) {
        return payload;
    }
}
