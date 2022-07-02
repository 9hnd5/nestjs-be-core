import { Module } from "@nestjs/common";
import { CommonModule } from "modules/common/common.module";
import { ScopeVariableModule } from "modules/scope-variable/scope-variable.module";
import { HealthController } from "./health.controller";
import { HealthService } from "./health.service";

@Module({
  imports: [ScopeVariableModule, CommonModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
