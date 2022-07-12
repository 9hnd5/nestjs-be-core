import { Injectable } from '@nestjs/common';
import { Session } from 'models/common.model';
import { RedisCacheService } from 'modules/cache/redis-cache.service';
type Type = 'ACCCESS_TOKEN' | 'REFRESH_TOKEN';
@Injectable()
export class SessionService {
    constructor(private cacheService: RedisCacheService) {}

    get(token: string, tenantCode: string, type: Type) {
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${token}` : token;
        if (type === 'ACCCESS_TOKEN') {
            key = `A:${key}`;
        } else {
            key = `R:${key}`;
        }

        return this.cacheService.get(key);
    }

    set(token: string, tenantCode: string, session: Session, type: Type) {
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${token}` : token;
        if (type === 'ACCCESS_TOKEN') {
            key = `A:${key}`;
        } else {
            key = `R:${key}`;
        }

        return this.cacheService.set(key, '', session);
    }

    remove(token: string, tenantCode: string, type: Type) {
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${token}` : token;
        if (type === 'ACCCESS_TOKEN') {
            key = `A:${key}`;
        } else {
            key = `R:${key}`;
        }

        return this.cacheService.remove(key);
    }
}
