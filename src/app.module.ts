import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CachingModule } from "modules/caching";
import { CommonModule } from "modules/common";
import { HealthModule } from "modules/health";
import { load } from "./config";


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [load],
      isGlobal: true,
    }),
    HealthModule,
    CommonModule,
    // ExampleModule,
    CachingModule,
  ],
})
export class AppModule {}
