import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector, REQUEST } from '@nestjs/core';
import { includes } from 'lodash';
import { Session } from '~/models/common.model';
import { LOCAL_AUTHORIZE_KEY } from '~/modules/auth/decorators/local.decorator';
import { Permission } from '~/modules/auth/enums/permission.enum';
import { SessionService } from '~/modules/session/session.service';
import { storage } from '~/storage';

@Injectable()
export class LocalAuthorizeGuard implements CanActivate {
    constructor(private ref: Reflector, private sessionService: SessionService) {}

    async canActivate(context: ExecutionContext) {
        const localAuthData = this.ref.get(LOCAL_AUTHORIZE_KEY, context.getHandler());
        if (!localAuthData) return true;

        const request = context.switchToHttp().getRequest();
        const { accessToken, tenantCode } = request.scopeVariable;
        const session = (await this.sessionService.get(accessToken, tenantCode, 'ACCCESS_TOKEN')) as Session;
        if (!session) return false;
        const store = storage.getStore()!;
        store.request.scopeVariable.session = session;

        const { permission, featureName } = localAuthData;

        if (permission === Permission.All) {
            return true;
        }

        if (Array.isArray(session.roles) && !!session.roles.find((r) => r.name === 'Administrator')) {
            return true;
        }

        if (Array.isArray(session.allPermissionFeatures) && includes(session.allPermissionFeatures, featureName)) {
            return true;
        }

        if (
            permission === Permission.View &&
            Array.isArray(session.viewPermissionFeatures) &&
            includes(session.viewPermissionFeatures, featureName)
        ) {
            return true;
        }

        if (
            permission === Permission.Insert &&
            Array.isArray(session.insertPermissionFeatures) &&
            includes(session.insertPermissionFeatures, featureName)
        ) {
            return true;
        }

        if (
            permission === Permission.Update &&
            Array.isArray(session.updatePermissionFeatures) &&
            includes(session.updatePermissionFeatures, featureName)
        ) {
            return true;
        }

        if (
            permission === Permission.Delete &&
            Array.isArray(session.deletePermissionFeatures) &&
            includes(session.deletePermissionFeatures, featureName)
        ) {
            return true;
        }

        return false;
    }
}
