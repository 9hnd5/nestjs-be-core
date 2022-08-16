import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '~/modules/auth/strategies/local-strategy';
import { RedisCacheService } from '~/modules/cache/redis-cache.service';
import { SessionModule } from '~/modules/session/session.module';
import { AuthService } from './auth.service';
import { AuthorizeGuard } from './guards/jwt-authorize.guard';
import { JwtAuthenticateGuard } from './guards/jwt-authenticate.guard';
import { LocalAuthenticateGuard } from './guards/local-authenticate.guard';
import { JwtStrategy } from './strategies/jwt-strategy';
import { LocalAuthorizeGuard } from '~/modules/auth/guards/local-authorize.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [JwtModule.register({}), SessionModule, PassportModule],
    providers: [
        JwtStrategy,
        LocalStrategy,
        RedisCacheService,
        AuthService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthenticateGuard,
        },
        {
            provide: APP_GUARD,
            useClass: AuthorizeGuard,
        },
        {
            provide: APP_GUARD,
            useClass: LocalAuthenticateGuard,
        },
        {
            provide: APP_GUARD,
            useClass: LocalAuthorizeGuard,
        },
    ],
    exports: [AuthService],
})
export class AuthModule {}
