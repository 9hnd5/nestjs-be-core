import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import axios, { AxiosResponse } from 'axios';
import { Request } from 'express';
import { ScopeVariable } from '~/models/common.model';
import { SuccessResponse } from '~/models/response.model';
import { MODULE_OPTIONS_TOKEN } from './const';
import { HttpOption } from './type';

type OverrideOption = Partial<HttpOption> | null;

@Injectable()
export class HttpService {
    public scopeVariable!: ScopeVariable;

    constructor(@Inject(REQUEST) req: Request, @Inject(MODULE_OPTIONS_TOKEN) private registerOption: HttpOption) {
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
    async get<T = any, R = T extends Record<string, any> | number | string | boolean ? SuccessResponse<T> : T>(
        url: string,
        overrideOption: OverrideOption = null
    ): Promise<R> {
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

            return data as R;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw error.response.data;
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                throw error.toJSON().message;
            } else {
                // Something happened in setting up the request that triggered an Error
                throw error.message;
            }
        }
    }

    /**
     * This method is use to make a http post request to external api and can override the default config
     * @param overrideOption override config for this method
     */
    async post<T = any, R = T extends Record<string, any> | number | string | boolean ? SuccessResponse<T> : T>(
        url: string,
        body: any,
        overrideOption: OverrideOption = null
    ) {
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

            return data as R;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw error.response.data;
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                throw error.toJSON().message;
            } else {
                // Something happened in setting up the request that triggered an Error
                throw error.message;
            }
        }
    }

    /**
     * This method is use to make a http put request to external api and can override the default config
     * @param overrideOption override config for this method
     */
    async put<T = any, R = T extends Record<string, any> | number | string | boolean ? SuccessResponse<T> : T>(
        url: string,
        body: any,
        overrideOption: OverrideOption = null
    ) {
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

            return data as R;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw error.response.data;
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                throw error.toJSON().message;
            } else {
                // Something happened in setting up the request that triggered an Error
                throw error.message;
            }
        }
    }

    /**
     * This method is use to make a http patch request to external api and can override the default config
     * @param overrideOption override config for this method
     */
    async patch<T = any, R = T extends Record<string, any> | number | string | boolean ? SuccessResponse<T> : T>(
        url: string,
        body: any,
        overrideOption: OverrideOption = null
    ) {
        const { autoInject, config } = this.getOption(overrideOption);
        try {
            let response = {} as AxiosResponse;
            if (autoInject) {
                const { requestId, tenantId, tenantCode, accessToken } = this.scopeVariable;
                if (requestId && tenantId && tenantCode && accessToken) {
                    response = await axios.patch(url, body, {
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
                response = await axios.patch(url, body, config);
            }

            const { data } = response;

            return data as R;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw error.response.data;
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                throw error.toJSON().message;
            } else {
                // Something happened in setting up the request that triggered an Error
                throw error.message;
            }
        }
    }

    /**
     * This method is use to make a http delete request to external api and can override the default config
     * @param overrideOption override config for this method
     */
    async delete<T = any, R = T extends Record<string, any> | number | string | boolean ? SuccessResponse<T> : T>(
        url: string,
        overrideOption: OverrideOption = null
    ) {
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

            return data as R;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw error.response.data;
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                throw error.toJSON().message;
            } else {
                // Something happened in setting up the request that triggered an Error
                throw error.message;
            }
        }
    }
}
