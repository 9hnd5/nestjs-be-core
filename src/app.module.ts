import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { load } from './config';
import { CachingModule } from './modules/caching';
import { CommonModule } from './modules/common/common.module';
import { ExampleModule } from './modules/example';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [load],
      isGlobal: true
    }),
    HealthModule,
    CommonModule,
    ExampleModule,
    CachingModule
  ],
})
export class AppModule {}
