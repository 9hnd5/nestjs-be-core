import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ScopeVariable, Session } from '~/models/common.model';
import getInstance, { RedisCacheService as CachingService } from '~/modules/cache/redis-cache.service';

@Injectable()
export class BaseController {
    public readonly scopeVariable: ScopeVariable;
    private cachingService: CachingService = getInstance();
    constructor(@Inject(REQUEST) protected httpRequest: any) {
        this.scopeVariable = httpRequest.scopeVariable;
    }

    getUserSession(accessToken: string) {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${accessToken}` : accessToken;
        key = `A:${key}`;

        return this.cachingService.get(key);
    }

    setUserSession(accessToken: string, session: Session) {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${accessToken}` : accessToken;
        key = `A:${key}`;

        return this.cachingService.set(key, '', session);
    }

    removeUserSession(accessToken: string) {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${accessToken}` : accessToken;
        key = `A:${key}`;

        return this.cachingService.remove(key);
    }

    getSession(refreshToken: string) {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${refreshToken}` : refreshToken;
        key = `R:${key}`;

        return this.cachingService.get(key);
    }

    setSession(refreshToken: string, session: Session) {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${refreshToken}` : refreshToken;
        key = `R:${key}`;

        return this.cachingService.set(key, '', session);
    }

    removeSession(refreshToken: string) {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${refreshToken}` : refreshToken;
        key = `R:${key}`;

        return this.cachingService.remove(key);
    }
}
