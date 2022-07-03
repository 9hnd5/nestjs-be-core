import { Injectable, Scope } from "@nestjs/common";
import Redis from 'ioredis'
import { ConfigService } from "@nestjs/config";
import { get } from '../../config'

@Injectable({ scope: Scope.DEFAULT })
export class RedisCachingService {
    private client: Redis;
    constructor(configService: ConfigService) {
        this.client = new Redis({
            ...configService.get('redis'),
            lazyConnect: true
        });
        if (!redisCachingService) redisCachingService = this;
    }

    public async get<T>(key: string, hashKey: string): Promise<T | null> {
        if (!hashKey) {
            const data = await this.client.get(key);
            if (data) {
                return JSON.parse(data);
            }
        }
        else {
            const data = await this.client.hget(key, hashKey);
            if (data) {
                return JSON.parse(data);
            }
        }

        return null
    }

    public async set<T>(key: string, hashKey: string, data: T): Promise<void> {
        if (!data) return;

        if (!hashKey) {
            await this.client.set(key, JSON.stringify(data))
        }
        else {
            await this.client.hset(key, hashKey, JSON.stringify(data))
        }
    }

    public async remove(key: string, hashKey: string) {
        if (!hashKey) {
            await this.client.del(key)
        }
        else {
            await this.client.hdel(key, hashKey)
        }
    }

    public async removeMany(key: string | string[], hashKeys: string[]) {
        if (Array.isArray(key)) {
            await this.client.del(key)
        }
        else if (typeof key === 'string' && Array.isArray(hashKeys) &&  hashKeys.length > 0) {
            await this.client.hdel(key, ...hashKeys)
        }
    }
}

let redisCachingService: RedisCachingService;

export default () => redisCachingService