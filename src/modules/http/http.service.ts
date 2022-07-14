import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import axios, { AxiosResponse } from 'axios';
import { ScopeVariable } from 'models/common.model';
import { HTTP_OPTION } from './const';
import { HttpOption } from './type';
import { UnauthorizedException } from 'models/error.model';

type OverrideOption = Partial<HttpOption> | null;

@Injectable()
export class HttpService {
    public scopeVariable!: ScopeVariable;

    constructor(@Inject(REQUEST) req: any, @Inject(HTTP_OPTION) private registerOption: HttpOption) {
        this.scopeVariable = req.scopeVariable;
    }

    private getOption(overrideOption: OverrideOption) {
        const option = this.registerOption ?? ({} as HttpOption);
        if (overrideOption?.autoInject) {
            option.autoInject = overrideOption.autoInject;
        }
        if (overrideOption?.config) {
            option.config = overrideOption.config;
        }

        if (!option) {
            throw new Error('Please config module before use');
        }

        return option;
    }

    /**
     * This method is use to make a http get request to external api and can override the default config
     * @param overrideOption override config for this method
     */
    async get(url: string, overrideOption: OverrideOption = null) {
        const { autoInject, config } = this.getOption(overrideOption);
        try {
            let response = {} as AxiosResponse;
            if (autoInject) {
                const { requestId, tenantId, tenantCode, accessToken } = this.scopeVariable;
                if (requestId && tenantId && tenantCode && accessToken) {
                    response = await axios.get(url, {
                        ...config,
                        headers: {
                            requestId,
                            tenantId,
                            tenantCode,
                            accessToken,
                        },
                    });
                } else {
                    throw new UnauthorizedException('Unauthorize');
                }
            } else {
                response = await axios.get(url, config);
            }
            const { data } = response;

            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * This method is use to make a http post request to external api and can override the default config
     * @param overrideOption override config for this method
     */
    async post(url: string, body: any, overrideOption: OverrideOption = null) {
        const { autoInject, config } = this.getOption(overrideOption);
        try {
            let response = {} as AxiosResponse;
            if (autoInject) {
                const { requestId, tenantId, tenantCode, accessToken } = this.scopeVariable;
                if (requestId && tenantId && tenantCode && accessToken) {
                    response = await axios.post(url, body, {
                        ...config,
                        headers: {
                            requestId,
                            tenantId,
                            tenantCode,
                            accessToken,
                        },
                    });
                } else {
                    throw new UnauthorizedException('Unauthorize');
                }
            } else {
                response = await axios.post(url, body, config);
            }

            const { data } = response;

            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * This method is use to make a http put request to external api and can override the default config
     * @param overrideOption override config for this method
     */
    async put(url: string, body: any, overrideOption: OverrideOption = null) {
        const { autoInject, config } = this.getOption(overrideOption);
        try {
            let response = {} as AxiosResponse;
            if (autoInject) {
                const { requestId, tenantId, tenantCode, accessToken } = this.scopeVariable;
                if (requestId && tenantId && tenantCode && accessToken) {
                    response = await axios.put(url, body, {
                        ...config,
                        headers: {
                            requestId,
                            tenantId,
                            tenantCode,
                            accessToken,
                        },
                    });
                } else {
                    throw new UnauthorizedException('Unauthorize');
                }
            } else {
                response = await axios.put(url, body, config);
            }

            const { data } = response;

            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * This method is use to make a http delete request to external api and can override the default config
     * @param overrideOption override config for this method
     */
    async delete(url: string, overrideOption: OverrideOption = null) {
        const { autoInject, config } = this.getOption(overrideOption);
        try {
            let response = {} as AxiosResponse;
            if (autoInject) {
                const { requestId, tenantId, tenantCode, accessToken } = this.scopeVariable;
                if (requestId && tenantId && tenantCode && accessToken) {
                    response = await axios.delete(url, {
                        ...config,
                        headers: {
                            requestId,
                            tenantId,
                            tenantCode,
                            accessToken,
                        },
                    });
                } else {
                    throw new UnauthorizedException('Unauthorize');
                }
            } else {
                response = await axios.delete(url, config);
            }

            const { data } = response;

            return data;
        } catch (error) {
            throw error;
        }
    }
}
