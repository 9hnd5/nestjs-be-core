import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from 'app.controller';
import { AuthModule } from 'modules/auth/auth.module';
import { InitialModule } from 'modules/initial/initial.module';
import { load } from './config';

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
})
export class AppModule {}
