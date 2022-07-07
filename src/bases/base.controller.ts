import { Session } from 'models/session.model';
import getInstance, {
    RedisCachingService as CachingService,
} from 'modules/caching/redis.caching.service';
import { ScopeVariable } from 'modules/scope-variable/scope-variable.model';

export class BaseController {
    public readonly scopeVariable: ScopeVariable;
    private cachingService: CachingService = getInstance();
    constructor(protected httpRequest: any) {
        this.scopeVariable = httpRequest.scopeVariable;
    }

    public async getUserSession(accessToken: string): Promise<Session | null> {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${accessToken}` : accessToken;
        key = `A:${key}`;

        return await this.cachingService.get(key, undefined);
    }

    public async setUserSession(accessToken: string, session: Session): Promise<void> {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${accessToken}` : accessToken;
        key = `A:${key}`;

        await this.cachingService.set(key, undefined, session);
    }

    public async removeUserSession(accessToken: string): Promise<void> {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${accessToken}` : accessToken;
        key = `A:${key}`;

        await this.cachingService.remove(key, undefined);
    }

    public async getSession(refreshToken: string): Promise<Session | null> {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${refreshToken}` : refreshToken;
        key = `R:${key}`;

        return await this.cachingService.get(key, undefined);
    }

    public async removeSession(refreshToken: string): Promise<void> {
        const tenantCode = this.scopeVariable.tenantCode;
        let key = tenantCode ? `${tenantCode.toLowerCase()}:${refreshToken}` : refreshToken;
        key = `R:${key}`;

        await this.cachingService.remove(key, undefined);
    }
}
