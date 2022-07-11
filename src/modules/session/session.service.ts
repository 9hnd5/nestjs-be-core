import { Injectable } from '@nestjs/common';
import { Session } from 'models/common.model';
import { RedisCacheService } from 'modules/cache/redis-cache.service';

@Injectable()
export class SessionService {
    constructor(private cacheService: RedisCacheService) {}

    getByAccessToken(accessToken: string, tenantCode: string) {
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${accessToken}` : accessToken;
        key = `A:${key}`;

        return this.cacheService.get(key);
    }

    setByAccessToken(accessToken: string, tenantCode: string, session: Session) {
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${accessToken}` : accessToken;
        key = `A:${key}`;

        return this.cacheService.set(key, '', session);
    }

    removeByAccessToken(accessToken: string, tenantCode: string) {
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${accessToken}` : accessToken;
        key = `A:${key}`;

        return this.cacheService.remove(key);
    }

    getByRefreshToken(refreshToken: string, tenantCode: string) {
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${refreshToken}` : refreshToken;
        key = `R:${key}`;

        return this.cacheService.get(key);
    }

    setByRefreshToken(refreshToken: string, tenantCode: string, session: Session) {
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${refreshToken}` : refreshToken;
        key = `R:${key}`;

        return this.cacheService.set(key, '', session);
    }

    removeByRefreshToken(refreshToken: string, tenantCode: string) {
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${refreshToken}` : refreshToken;
        key = `R:${key}`;

        return this.cacheService.remove(key);
    }
}
