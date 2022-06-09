import { Inject, Injectable, NestMiddleware, Scope } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ScopeVariable } from './scope-variable.model';
import { HeaderKeys } from 'src/constants'
import { CommonHelper } from 'src/helpers';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class ScopeVariableMiddleWare implements NestMiddleware {
    constructor(
        private readonly configService: ConfigService,
        @Inject(REQUEST) private request: any
    ) {
    }

    async use(req: Request | any, res: Response, next: NextFunction) {
        const scopeVariable: ScopeVariable = new ScopeVariable()

        scopeVariable.accessToken = req.headers[HeaderKeys.AccessToken.toLowerCase()]
        scopeVariable.refreshToken = req.headers[HeaderKeys.RefreshToken.toLowerCase()]
        scopeVariable.appName = req.headers[HeaderKeys.AppName.toLowerCase()]
        scopeVariable.appBuildNumber = req.headers[HeaderKeys.AppBuildNumber.toLowerCase()]
        scopeVariable.requestId = req.headers[HeaderKeys.RequestId.toLowerCase()]
        if (!scopeVariable.requestId) {
            scopeVariable.requestId = CommonHelper.uuidv4()
        }

        scopeVariable.tenantCode = req.headers[HeaderKeys.TenantCode.toLowerCase()]
        if (scopeVariable.tenantCode) {
            // todo
        }
        else {
            scopeVariable.primarySQLConnectionString = this.configService.get<string>('primarySQLConnectionString').replace('_{0}', '')
            scopeVariable.secondarySQLConnectionString = this.configService.get<string>('secondarySQLConnectionString').replace('_{0}', '')
            scopeVariable.tenantId = -1;
        }

        this.request.scopeVariable = scopeVariable;

        next();
    }
}