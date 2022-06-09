import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '../common/common.module';
import { ScopeVariableMiddleWare } from './scope-variable.middleware';
import { ScopeVariable } from './scope-variable.model';

@Module({
  imports: [
      ConfigModule,
      CommonModule
  ],
  providers: [
      ScopeVariable
  ],
  exports: [
    ScopeVariable
  ]
})
export class ScopeVariableModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(ScopeVariableMiddleWare)
        .forRoutes('*');
    }
  }
