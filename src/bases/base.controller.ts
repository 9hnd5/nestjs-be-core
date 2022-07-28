import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ScopeVariable, Session } from '~/models/common.model';
import getInstance, { RedisCacheService as CachingService } from '~/modules/cache/redis-cache.service';

@Injectable()
export class BaseController {
    public readonly scopeVariable: ScopeVariable;
    private cachingService: CachingService = getInstance();
    constructor(@Inject(REQUEST) protected req: Request) {
        this.scopeVariable = req.scopeVariable;
    }

    /**
     * @deprecated please use session service instead
     */
    getUserSession(accessToken: string) {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${accessToken}` : accessToken;
        key = `A:${key}`;

        return this.cachingService.get(key);
    }

    /**
     * @deprecated please use session service instead
     */
    setUserSession(accessToken: string, session: Session) {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${accessToken}` : accessToken;
        key = `A:${key}`;

        return this.cachingService.set(key, '', session);
    }

    /**
     * @deprecated please use session service instead
     */
    removeUserSession(accessToken: string) {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${accessToken}` : accessToken;
        key = `A:${key}`;

        return this.cachingService.remove(key);
    }

    /**
     * @deprecated please use session service instead
     */
    getSession(refreshToken: string) {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${refreshToken}` : refreshToken;
        key = `R:${key}`;

        return this.cachingService.get(key);
    }

    /**
     * @deprecated please use session service instead
     */
    setSession(refreshToken: string, session: Session) {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${refreshToken}` : refreshToken;
        key = `R:${key}`;

        return this.cachingService.set(key, '', session);
    }

    /**
     * @deprecated please use session service instead
     */
    removeSession(refreshToken: string) {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${refreshToken}` : refreshToken;
        key = `R:${key}`;

        return this.cachingService.remove(key);
    }
}
