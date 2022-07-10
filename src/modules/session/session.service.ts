import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ScopeVariable, Session } from 'models/common.model';
import { RedisCacheService } from 'modules/cache/redis-cache.service';

@Injectable({ scope: Scope.REQUEST })
export class SessionService {
    private scopeVariable: ScopeVariable;
    constructor(private cacheService: RedisCacheService, @Inject(REQUEST) request: any) {
        this.scopeVariable = request.scopeVariable;
    }

    getByAccessToken(accessToken: string) {
        const { tenantCode } = this.scopeVariable;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${accessToken}` : accessToken;
        key = `A:${key}`;

        return this.cacheService.get(key);
    }

    setByAccessToken(accessToken: string, session: Session) {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${accessToken}` : accessToken;
        key = `A:${key}`;

        return this.cacheService.set(key, '', session);
    }

    removeByAccessToken(accessToken: string) {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${accessToken}` : accessToken;
        key = `A:${key}`;

        return this.cacheService.remove(key);
    }

    getByRefreshToken(refreshToken: string) {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${refreshToken}` : refreshToken;
        key = `R:${key}`;

        return this.cacheService.get(key);
    }

    setByRefreshToken(refreshToken: string, session: Session) {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${refreshToken}` : refreshToken;
        key = `R:${key}`;

        return this.cacheService.set(key, '', session);
    }

    removeByRefreshToken(refreshToken: string) {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${refreshToken}` : refreshToken;
        key = `R:${key}`;

        return this.cacheService.remove(key);
    }
}
