import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AUTHORIZE_KEY } from '~/modules/auth/decorators/auth.decorator';

/**
 * @deprecated
 */
@Injectable()
export class JwtAuthenticateGuard extends AuthGuard('jwt') {
    constructor(private ref: Reflector) {
        super();
    }
    canActivate(context: ExecutionContext) {
        const auth = this.ref.get(AUTHORIZE_KEY, context.getHandler());
        if (!auth) return true;
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            throw new UnauthorizedException(info.message);
        }
        return user;
    }
}
