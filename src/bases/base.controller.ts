import { Session } from "src/models";
import getInstance, { CachingService } from "src/modules/caching";
import { ScopeVariable } from "src/modules/scope-variable";

export class BaseController {
    public readonly scopeVariable: ScopeVariable;
    private cachingService: CachingService = getInstance();
    constructor(protected httpRequest: any) {
        this.scopeVariable = httpRequest.scopeVariable;
    }

    public async getUserSession(accessToken: string): Promise<Session | null> {
        var tenantCode = this.scopeVariable.tenantCode;
        var key = tenantCode ? `${tenantCode.toLowerCase()}:${accessToken}` : accessToken;
        key = `A:${key}`;

        return await this.cachingService.get(key, undefined);
    }

    public async setUserSession(accessToken: string, session: Session): Promise<void> {
        var tenantCode = this.scopeVariable.tenantCode;
        var key = tenantCode ? `${tenantCode.toLowerCase()}:${accessToken}` : accessToken;
        key = `A:${key}`;

        await this.cachingService.set(key, undefined, session);
    }

    public async removeUserSession(accessToken: string): Promise<void> {
        var tenantCode = this.scopeVariable.tenantCode;
        var key = tenantCode ? `${tenantCode.toLowerCase()}:${accessToken}` : accessToken;
        key = `A:${key}`;

        await this.cachingService.remove(key, undefined);
    }

    public async getSession(refreshToken: string): Promise<Session | null> {
        var tenantCode = this.scopeVariable.tenantCode;
        var key = tenantCode ? `${tenantCode.toLowerCase()}:${refreshToken}` : refreshToken;
        key = `R:${key}`;

        return await this.cachingService.get(key, undefined);
    }

    public async removeSession(refreshToken: string): Promise<void> {
        var tenantCode = this.scopeVariable.tenantCode;
        var key = tenantCode ? `${tenantCode.toLowerCase()}:${refreshToken}` : refreshToken;
        key = `R:${key}`;

        await this.cachingService.remove(key, undefined);
    }
}