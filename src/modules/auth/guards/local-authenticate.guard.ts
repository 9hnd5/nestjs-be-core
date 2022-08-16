import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { LOCAL_AUTHORIZE_KEY } from '~/modules/auth/decorators/local.decorator';

@Injectable()
export class LocalAuthenticateGuard extends AuthGuard('local') {
    constructor(private ref: Reflector) {
        super();
    }
    canActivate(context: ExecutionContext) {
        // const localAuth = this.ref.get(LOCAL_AUTHORIZE_KEY, context.getHandler());
        // if (!localAuth) return true;
        // return super.canActivate(context);
        return true;
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            throw new UnauthorizedException(info.message);
        }
        return user;
    }
}
