import { NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { DataSource } from 'typeorm';

export class TryConnecDBMiddleware implements NestMiddleware {
    async use(req: Request, res: any, next: (error?: any) => void) {
        const { scopeVariable } = req;
        const datasource = new DataSource({
            type: 'mysql',
            host: scopeVariable.primary?.host,
            port: scopeVariable.primary?.port,
            username: scopeVariable.primary?.username,
            password: scopeVariable.primary?.password,
            database: scopeVariable.primary?.database,
        });
        //try connect database
        try {
            await datasource.initialize();
            next();
        } catch (e) {
            next(e);
        } finally {
            //Detroy connection
            if (datasource.isInitialized) {
                await datasource.destroy();
            }
        }
    }
}
