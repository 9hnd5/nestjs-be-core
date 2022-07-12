import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private configService: ConfigService) {}

    generateToken(payload: Record<string, any>) {
        const { secret, issuer, expiresIn } = this.configService.get('jwt');
        return this.jwtService.signAsync(payload, { secret, issuer, expiresIn });
    }
}
