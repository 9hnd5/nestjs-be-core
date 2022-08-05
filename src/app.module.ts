import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from '~/app.controller';
import { load } from '~/config';
import { ExceptionsFilter } from '~/filters/exception.filter';
import { AuthModule } from '~/modules/auth/auth.module';
import { InitialModule } from '~/modules/initial/initial.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [load],
            isGlobal: true,
        }),
        AuthModule,
        InitialModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_FILTER,
            useClass: ExceptionsFilter,
        },
    ],
})
export class AppModule {}
