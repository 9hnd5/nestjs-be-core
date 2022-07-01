import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'modules/common';
import { CQRSModule } from 'modules/cqrs';
import { ScopeVariableModule } from 'modules/scope-variable';
import { SharedModule } from 'modules/shared';
import { ExampleModel } from 'modules/shared/models/example.model';
import { AddCommandHandler, DeleteCommandHandler, UpdateCommandHandler } from './commands';
import { ExampleController } from './example.controller';

@Module({
    imports: [
        ScopeVariableModule,
        CommonModule,
        SharedModule,
        CQRSModule,
        TypeOrmModule.forFeature([ExampleModel])
    ],
  controllers: [ExampleController],
  providers: [
      AddCommandHandler,
      UpdateCommandHandler,
      DeleteCommandHandler
  ]
})
export class ExampleModule {}
