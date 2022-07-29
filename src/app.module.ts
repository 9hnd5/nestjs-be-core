import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '~/app.controller';
import { load } from '~/config';
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
})
export class AppModule {}
