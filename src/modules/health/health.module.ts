import { Module } from '@nestjs/common';
import { CommonModule } from 'modules/common';
import { ScopeVariableModule } from 'modules/scope-variable';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
    imports: [
        ScopeVariableModule,
        CommonModule
    ],
  controllers: [HealthController],
  providers: [
      HealthService
  ]
})
export class HealthModule {}
