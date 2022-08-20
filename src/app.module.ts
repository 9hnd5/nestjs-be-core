import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import * as path from 'path';
import { AppCommandHandler } from '~/app.command';
import { AppController } from '~/app.controller';
import { load } from '~/config';
import { AuthModule } from '~/modules/auth/auth.module';
import { CQRSModule } from '~/modules/cqrs/cqrs.module';
import { HttpModule } from '~/modules/http/http.module';
import { InitialModule } from '~/modules/initial/initial.module';
import { MigrationModule } from '~/modules/migration/migration.module';

@Module({
    imports: [
        AuthModule,
        CQRSModule,
        CqrsModule,
        InitialModule,
        HttpModule.register({
            isGlobal: true,
        }),
        ConfigModule.forRoot({
            load: [load],
            isGlobal: true,
        }),
        MigrationModule.register({ entities: path.resolve(__dirname, 'modules/**.config.js') }),
    ],
    controllers: [AppController],
    providers: [AppCommandHandler],
})
export class AppModule {}
