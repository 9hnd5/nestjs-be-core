import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheService {
    private client: Redis;
    constructor(configService: ConfigService) {
        this.client = new Redis({
            ...configService.get('redis'),
            lazyConnect: true,
        });
        if (!redisCacheService) redisCacheService = this;
    }

    async get<T>(key: string, hashKey: string | null = null) {
        if (!hashKey) {
            const data = await this.client.get(key);
            if (data) {
                return JSON.parse(data);
            }
        } else {
            const data = await this.client.hget(key, hashKey);
            if (data) {
                return JSON.parse(data);
            }
        }

        return null;
    }

    async set<T>(key: string, hashKey: string, data: T) {
        if (!data) return;

        if (!hashKey) {
            await this.client.set(key, JSON.stringify(data));
        } else {
            await this.client.hset(key, hashKey, JSON.stringify(data));
        }
    }

    async remove(key: string, hashKey: string | null = null) {
        if (!hashKey) {
            await this.client.del(key);
        } else {
            await this.client.hdel(key, hashKey);
        }
    }

    async removeMany(key: string | string[], hashKeys: string[] | null = null) {
        if (Array.isArray(key)) {
            await this.client.del(key);
        } else if (typeof key === 'string' && Array.isArray(hashKeys) && hashKeys.length > 0) {
            await this.client.hdel(key, ...hashKeys);
        }
    }
}

let redisCacheService: RedisCacheService;

export default () => redisCacheService;
