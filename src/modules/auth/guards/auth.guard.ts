import { CanActivate, ExecutionContext, Injectable, Scope } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { includes } from 'lodash';
import { AUTHORIZE_KEY, Permission } from 'modules/auth/decorators/auth.decorator';
import { SessionService } from 'modules/session/session.service';

@Injectable({ scope: Scope.REQUEST })
export class AuthorizeGuard implements CanActivate {
    constructor(private ref: Reflector, private sessionService: SessionService) {}

    async canActivate(context: ExecutionContext) {
        const authData = this.ref.get(AUTHORIZE_KEY, context.getHandler());
        if (!authData) return true;

        const request = context.switchToHttp().getRequest();
        const { accessToken } = request.scopeVariable;
        const session = await this.sessionService.getByAccessToken(accessToken);

        if (!session) return false;
        const { permission, featureName } = authData;

        if (permission === Permission.All) {
            return true;
        }

        if (Array.isArray(session.Roles) && !!session.Roles.find((r) => r.name === 'Administrator')) {
            return true;
        }

        if (Array.isArray(session.AllPermissionFeatures) && includes(session.AllPermissionFeatures, featureName)) {
            return true;
        }

        if (
            permission === Permission.View &&
            Array.isArray(session.ViewPermissionFeatures) &&
            includes(session.ViewPermissionFeatures, featureName)
        ) {
            return true;
        }

        if (
            permission === Permission.Insert &&
            Array.isArray(session.InsertPermissionFeatures) &&
            includes(session.InsertPermissionFeatures, featureName)
        ) {
            return true;
        }

        if (
            permission === Permission.Update &&
            Array.isArray(session.UpdatePermissionFeatures) &&
            includes(session.UpdatePermissionFeatures, featureName)
        ) {
            return true;
        }

        if (
            permission === Permission.Delete &&
            Array.isArray(session.DeletePermissionFeatures) &&
            includes(session.DeletePermissionFeatures, featureName)
        ) {
            return true;
        }

        return false;
    }
}
