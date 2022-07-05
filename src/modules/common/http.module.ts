import { DynamicModule, Module } from "@nestjs/common";
import { AxiosRequestConfig } from "axios";
import { HttpService } from "./http.service";

export type HttpOption = {
  url: string;
  autoInject: boolean;
  config?: AxiosRequestConfig;
};

export const HTTP_OPTION = Symbol("HTTP_OPTION");

@Module({})
export class HttpModule {
  static register(option: HttpOption = null): DynamicModule {
    return {
      module: HttpModule,
      providers: [HttpService, { provide: HTTP_OPTION, useValue: option }],
      exports: [HttpService],
    };
  }
}
