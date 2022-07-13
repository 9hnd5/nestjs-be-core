import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HeaderKeys } from 'constants/const';
import { NextFunction, Request, Response } from 'express';
import { CommonHelper } from 'helpers/common.helper';
import { DatabaseOption, ScopeVariable } from 'models/common.model';

@Injectable()
export class ScopeVariableMiddleWare implements NestMiddleware {
    constructor(private configService: ConfigService) {}

    use(req: Request | any, res: Response, next: NextFunction) {
        const scopeVariable: ScopeVariable = new ScopeVariable();

        scopeVariable.accessToken = req.headers[HeaderKeys.AccessToken.toLowerCase()];
        scopeVariable.refreshToken = req.headers[HeaderKeys.RefreshToken.toLowerCase()];
        scopeVariable.appName = req.headers[HeaderKeys.AppName.toLowerCase()];
        scopeVariable.appBuildNumber = req.headers[HeaderKeys.AppBuildNumber.toLowerCase()];
        scopeVariable.requestId = req.headers[HeaderKeys.RequestId.toLowerCase()];
        if (!scopeVariable.requestId) {
            scopeVariable.requestId = CommonHelper.uuidv4();
        }

        scopeVariable.tenantCode = req.headers[HeaderKeys.TenantCode.toLowerCase()];
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

        req.scopeVariable = scopeVariable;

        next();
    }
}
