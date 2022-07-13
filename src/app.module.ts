import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from 'app.controller';
import { AuthModule } from 'modules/auth/auth.module';
import { CacheModule } from 'modules/cache/cache.module';
import { CommonModule } from 'modules/common/common.module';
import { FileModule } from 'modules/file/file.module';
import { HealthModule } from 'modules/health/health.module';
import { InitialModule } from 'modules/initial/initial.module';
import { load } from './config';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [load],
            isGlobal: true,
        }),
        HealthModule,
        CommonModule,
        AuthModule,
        CacheModule,
        InitialModule,
        FileModule.register('mongodb://rootuser:rootpass@localhost:27017/admin'),
        // TypeOrmModule.forRootAsync({
        //     useFactory: (request: any) => ({
        //         type: 'mysql',
        //         host: request.scopeVariable.primary.host,
        //         port: request.scopeVariable.primary.port,
        //         username: request.scopeVariable.primary.username,
        //         password: request.scopeVariable.primary.password,
        //         database: request.scopeVariable.primary.database,
        //         entities: [__dirname + '/modules/shared/models/*{.ts,.js}'],
        //         synchronize: false,
        //     }),
        //     inject: [REQUEST],
        // }),
    ],
    controllers: [AppController],
})
export class AppModule {}
