import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'modules/common';
import { ScopeVariable } from './scope-variable.model';
import { ScopeVariableMiddleWare } from './scope-variable.middleware';

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
