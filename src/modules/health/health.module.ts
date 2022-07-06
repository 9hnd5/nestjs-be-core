import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "modules/http/http.module";
import { ScopeVariableModule } from "modules/scope-variable/scope-variable.module";
import { HealthController } from "./health.controller";
import { HealthService } from "./health.service";

@Module({
  imports: [ScopeVariableModule, ConfigModule, HttpModule.register()],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
