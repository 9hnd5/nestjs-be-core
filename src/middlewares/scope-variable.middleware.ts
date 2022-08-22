import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { UUID } from 'bson';
import { NextFunction, Request, Response } from 'express';
import { HeaderKeys } from '~/constants/const';
import { DatabaseOption, ScopeVariable } from '~/models/common.model';
import { storage } from '~/storage';
@Injectable()
export class ScopeVariableMiddleWare implements NestMiddleware {
    constructor(private configService: ConfigService, private moduleRef: ModuleRef) {}

    use(request: Request, res: Response, next: NextFunction) {
        const scopeVariable: ScopeVariable = new ScopeVariable();
        scopeVariable.accessToken = request.header(HeaderKeys.AccessToken.toLowerCase());
        scopeVariable.refreshToken = request.header(HeaderKeys.RefreshToken.toLowerCase());
        scopeVariable.appName = request.header(HeaderKeys.AppName.toLowerCase());
        scopeVariable.appBuildNumber = request.header(HeaderKeys.AppBuildNumber.toLowerCase());
        scopeVariable.requestId = request.header(HeaderKeys.RequestId.toLowerCase());
        if (!scopeVariable.requestId) {
            scopeVariable.requestId = new UUID().toString();
        }
        scopeVariable.tenantCode = request.header(HeaderKeys.TenantCode.toLowerCase());
        if (scopeVariable.tenantCode) {
            // todo
            const primary = this.configService.get<DatabaseOption>('primarySQLConnection')!;
            scopeVariable.primary = {
                ...primary,
                database: primary.database.replace('{0}', scopeVariable.tenantCode),
            };
            const secondary = this.configService.get<DatabaseOption>('secondarySQLConnection')!;
            scopeVariable.secondary = {
                ...secondary,
                database: secondary.database.replace('{0}', scopeVariable.tenantCode),
            };
            scopeVariable.tenantId = 1;
        } else {
            const primary = this.configService.get<DatabaseOption>('primarySQLConnection')!;
            scopeVariable.primary = {
                ...primary,
                database: primary.database.replace('_{0}', ''),
            };
            const secondary = this.configService.get<DatabaseOption>('secondarySQLConnection')!;
            scopeVariable.secondary = {
                ...secondary,
                database: secondary.database.replace('_{0}', ''),
            };
            scopeVariable.tenantId = -1;
        }
        request.scopeVariable = scopeVariable;
        const ctxId = ContextIdFactory.getByRequest(request);
        this.moduleRef.registerRequestByContextId(request, ctxId);
        storage.run({ ctxId, request }, () => {
            next();
        });
    }
}
