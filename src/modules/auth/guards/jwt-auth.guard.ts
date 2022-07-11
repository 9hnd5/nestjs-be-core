import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from 'models/error.model';
import { AUTHORIZE_KEY } from '../decorators/auth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
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
