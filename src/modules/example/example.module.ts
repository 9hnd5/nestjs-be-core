import { Module } from '@nestjs/common';
import { CommonModule } from '../common';
import { CQRSModule } from '../cqrs';
import { ScopeVariable, ScopeVariableModule } from '../scope-variable';
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
      DeleteCommandHandler
  ]
})
export class ExampleModule {}
