import { Module } from '@nestjs/common';
import { CommonModule } from '../common';
import { ScopeVariableModule } from '../scope-variable';
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
