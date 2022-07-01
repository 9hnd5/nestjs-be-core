import { Inject, Injectable, NestMiddleware, Scope } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { ScopeVariable } from './scope-variable.model';
import { HeaderKeys } from 'constants/const';
import { CommonHelper } from 'helpers/common.helper';
import { DatabaseOption } from 'config';

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
            const primary = this.configService.get<DatabaseOption>('primarySQLConnection')
            scopeVariable.primary = {
                ...primary,
                database: primary.database.replace('_{0}', '')
            }
            const secondary = this.configService.get<DatabaseOption>('secondarySQLConnection')
            scopeVariable.secondary = {
                ...secondary,
                database: secondary.database.replace('_{0}', '')
            }
            scopeVariable.tenantId = -1;
        }

        this.request.scopeVariable = scopeVariable;

        next();
    }
}