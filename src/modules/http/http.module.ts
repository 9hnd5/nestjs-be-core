import { DynamicModule, Module } from "@nestjs/common";
import { HTTP_OPTION } from "./const";
import { HttpService } from "./http.service";
import { HttpOption } from "./type";

@Module({})
export class HttpModule {
  static register(option: HttpOption | null = null): DynamicModule {
    return {
      module: HttpModule,
      providers: [HttpService, { provide: HTTP_OPTION, useValue: option }],
      exports: [HttpService],
    };
  }
}
