import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { REQUEST } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CachingModule } from "modules/caching/caching.module";
import { CommonModule } from "modules/common/common.module";
import { ExampleModule } from "modules/example";
import { HealthModule } from "modules/health/health.module";
import { load } from "./config";


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [load],
      isGlobal: true,
    }),
    HealthModule,
    CommonModule,
    ExampleModule,
    CachingModule,
    TypeOrmModule.forRootAsync({
      useFactory: (request: any) => ({
        type: 'mysql',
        host: request.scopeVariable.primary.host,
        port: request.scopeVariable.primary.port,
        username: request.scopeVariable.primary.username,
        password: request.scopeVariable.primary.password,
        database: request.scopeVariable.primary.database,
        entities: [
          __dirname + '/modules/shared/models/*{.ts,.js}',
        ], 
        synchronize: false
      }),
      inject: [REQUEST]
    }),
    // TypeOrmModule.forRootAsync({
    //   name: 'SECONDARY_CONNECTION',
    //   useFactory: (request: any) => ({
    //     dialect: 'mysql',
    //     host: request.scopeVariable.secondary.host,
    //     port: request.scopeVariable.secondary.port,
    //     username: request.scopeVariable.secondary.username,
    //     password: request.scopeVariable.secondary.password,
    //     database: request.scopeVariable.secondary.database,
    //     models: [ExampleTest],
    //   }),
    //   inject: [REQUEST]
    // })
  ],
})
export class AppModule {}
