import { Module, Scope } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { RedisCacheService } from '~/modules/cache/redis-cache.service';
import { SessionModule } from '~/modules/session/session.module';
import { AuthService } from './auth.service';
import { AuthorizeGuard } from './guards/jwt-authorize.guard';
import { JwtAuthenticateGuard } from './guards/jwt-authenticate.guard';
import { JwtStrategy } from './strategies/jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthorizeGuard } from '~/modules/auth/guards/local-authorize.guard';

@Module({
    imports: [JwtModule.register({}), SessionModule, PassportModule],
    providers: [
        JwtStrategy,
        RedisCacheService,
        AuthService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthenticateGuard,
        },
        {
            provide: APP_GUARD,
            useClass: AuthorizeGuard,
            scope: Scope.REQUEST,
        },
        {
            provide: APP_GUARD,
            useClass: LocalAuthorizeGuard,
            scope: Scope.REQUEST,
        },
    ],
    exports: [AuthService],
})
export class AuthModule {}
