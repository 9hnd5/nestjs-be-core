import { Module, Scope } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { RedisCacheService } from '~/modules/cache/redis-cache.service';
import { SessionModule } from '~/modules/session/session.module';
import { AuthService } from './auth.service';
import { AuthorizeGuard } from './guards/auth.guard';
import { JwtAuthGuard as AuthenticateGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
    imports: [JwtModule.register({}), SessionModule],
    providers: [
        JwtStrategy,
        RedisCacheService,
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthenticateGuard,
        },
        {
            provide: APP_GUARD,
            useClass: AuthorizeGuard,
        },
    ],
    exports: [AuthService],
})
export class AuthModule {}
