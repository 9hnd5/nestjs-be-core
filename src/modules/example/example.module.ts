import { Module } from '@nestjs/common';
import { CommonModule } from '../common';
import { CQRSModule } from '../cqrs';
import { ScopeVariable, ScopeVariableModule } from '../scope-variable';
import { ExampleQueries } from '../shared/queries/example.queries';
import { ExampleRepository } from '../shared/repositories/example.repository';
import { SharedModule } from '../shared/shared.module';
import { AddCommandHandler, DeleteCommandHandler, UpdateCommandHandler } from './commands';
import { ExampleController } from './example.controller';

@Module({
    imports: [
        ScopeVariableModule,
        CommonModule,
        SharedModule,
        CQRSModule
    ],
  controllers: [ExampleController],
  providers: [
      AddCommandHandler,
      UpdateCommandHandler,
      DeleteCommandHandler,
      ExampleRepository,
      ExampleQueries,
      ScopeVariable
  ]
})
export class ExampleModule {}
