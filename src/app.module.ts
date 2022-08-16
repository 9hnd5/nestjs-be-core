import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { AppController } from '~/app.controller';
import { load } from '~/config';
import { AuthModule } from '~/modules/auth/auth.module';
import { InitialModule } from '~/modules/initial/initial.module';
import { MigrationModule } from '~/modules/migration/migration.module';

@Module({
    imports: [
        AuthModule,
        InitialModule,
        ConfigModule.forRoot({
            load: [load],
            isGlobal: true,
        }),
        MigrationModule.register({ entities: path.resolve(__dirname, 'modules/**.config.js') }),
    ],
    controllers: [AppController],
})
export class AppModule {}
