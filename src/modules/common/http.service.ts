import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import axios from "axios";
import { ScopeVariable } from "modules/scope-variable/scope-variable.model";
import { HttpOption, HTTP_OPTION } from "./http.module";

@Injectable({ scope: Scope.REQUEST })
export class HttpService {
  public scopeVariable!: ScopeVariable;

  constructor(
    @Inject(REQUEST) req: any,
    @Inject(HTTP_OPTION) private registerOption: HttpOption
  ) {
    this.scopeVariable = req.scopeVariable;
  }

  private getOption(overrideOption: Partial<HttpOption>) {
    let option = this.registerOption ?? ({} as HttpOption);

    if (overrideOption?.url) {
      option.url = overrideOption.url;
    }
    if (overrideOption?.autoInject) {
      option.autoInject = overrideOption.autoInject;
    }
    if (overrideOption?.config) {
      option.config = overrideOption.config;
    }

    if (!option) {
      throw new Error("Please config module before use");
    }

    return option;
  }

  /**
   * This method is use to make a http get request to external api and can override the default config
   * @param overrideOption override config for this method
   */
  async get(overrideOption: Partial<HttpOption> = null) {
    const { url, autoInject, config } = this.getOption(overrideOption);
    try {
      let response = null;
      if (autoInject) {
        const { requestId, tenantId, tenantCode, accessToken } =
          this.scopeVariable;
        response = await axios.get(url, {
          ...config,
          headers: { requestId, tenantId, tenantCode, accessToken },
        });
      } else {
        response = await axios.get(url, config);
      }

      const { data } = response;

      if (data?.result !== 0) return data?.data;
      else throw data?.errorMessage;
    } catch (error) {
      throw error.toString();
    }
  }

  async post(body: any, overrideOption: Partial<HttpOption> = null) {
    const { url, autoInject, config } = this.getOption(overrideOption);
    try {
      let response = null;
      if (autoInject) {
        const { requestId, tenantId, tenantCode, accessToken } =
          this.scopeVariable;
        response = await axios.post(url, body, {
          ...config,
          headers: { requestId, tenantId, tenantCode, accessToken },
        });
      } else {
        response = await axios.post(url, body, config);
      }

      const { data } = response;

      if (data?.result !== 0) return data?.data;
      else throw data?.errorMessage;
    } catch (error) {
      throw error.toString();
    }
  }

  async put(body: any, overrideOption: Partial<HttpOption> = null) {
    const { url, autoInject, config } = this.getOption(overrideOption);
    try {
      let response = null;
      if (autoInject) {
        const { requestId, tenantId, tenantCode, accessToken } =
          this.scopeVariable;
        response = await axios.put(url, body, {
          ...config,
          headers: { requestId, tenantId, tenantCode, accessToken },
        });
      } else {
        response = await axios.put(url, body, config);
      }

      const { data } = response;

      if (data?.result !== 0) return data?.data;
      else throw data?.errorMessage;
    } catch (error) {
      throw error.toString();
    }
  }

  async delete(overrideOption: Partial<HttpOption> = null) {
    const { url, autoInject, config } = this.getOption(overrideOption);
    try {
      let response = null;
      if (autoInject) {
        const { requestId, tenantId, tenantCode, accessToken } =
          this.scopeVariable;
        response = await axios.delete(url, {
          ...config,
          headers: { requestId, tenantId, tenantCode, accessToken },
        });
      } else {
        response = await axios.delete(url, config);
      }
      
      const { data } = response;

      if (data?.result !== 0) return data?.data;
      else throw data?.errorMessage;
    } catch (error) {
      throw error.toString();
    }
  }
}
