import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { merge } from 'lodash';
import { SuccessResponse } from '~/models/response.model';
import { storage } from '~/storage';
import { HTTP_MODULE_OPTIONS_TOKEN } from './const';
import { HttpOption } from './type';

@Injectable()
export class HttpService {
    constructor(@Inject(HTTP_MODULE_OPTIONS_TOKEN) private registerOption: HttpOption) {}

    private getOption(overrideOption?: HttpOption) {
        if (!overrideOption) {
            return this.registerOption;
        }
        const option = merge(this.registerOption, overrideOption);
        return option;
    }

    /**
     * This method is use to make a http get request to external api and can override the default config
     * @param overrideOption override config for this method
     */
    async get<T = any, R = T extends Record<string, any> | number | string | boolean ? SuccessResponse<T> : T>(
        url: string,
        overrideOption?: HttpOption
    ): Promise<R> {
        const {
            request: { scopeVariable },
        } = storage.getStore()!;
        const { autoInject, config } = this.getOption(overrideOption);
        try {
            let response = {} as AxiosResponse;
            if (autoInject) {
                const { requestId, tenantId, tenantCode, accessToken } = scopeVariable;
                if (requestId && tenantId && tenantCode && accessToken) {
                    const c = {
                        ...config,
                        headers: { ...config?.headers, requestId, tenantId, tenantCode, accessToken },
                    };
                    response = await axios.get(url, c);
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

    post<T = any, R = T extends Record<string, any> | number | string | boolean ? SuccessResponse<T> : T>(
        url: string,
        overrideOption?: HttpOption
    ): R;

    post<T = any, R = T extends Record<string, any> | number | string | boolean ? SuccessResponse<T> : T>(
        url: string,
        body?: any,
        overrideOption?: HttpOption
    ): R;

    /**
     * This method is use to make a http post request to external api and can override the default config
     * @param overrideOption override config for this method
     */
    async post<T = any, R = T extends Record<string, any> | number | string | boolean ? SuccessResponse<T> : T>(
        url: string,
        body?: any,
        overrideOption?: HttpOption
    ) {
        if ('config' in body || 'autoInject' in body) {
            overrideOption = body;
            body = null;
        }

        const {
            request: { scopeVariable },
        } = storage.getStore()!;
        const { autoInject, config } = this.getOption(overrideOption);
        try {
            let response = {} as AxiosResponse;
            if (autoInject) {
                const { requestId, tenantId, tenantCode, accessToken } = scopeVariable;
                if (requestId && tenantId && tenantCode && accessToken) {
                    const c = {
                        ...config,
                        headers: { ...config?.headers, requestId, tenantId, tenantCode, accessToken },
                    };
                    response = await axios.post(url, body, c);
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

    put<T = any, R = T extends Record<string, any> | number | string | boolean ? SuccessResponse<T> : T>(
        url: string,
        overrideOption?: HttpOption
    ): Promise<R>;
    put<T = any, R = T extends Record<string, any> | number | string | boolean ? SuccessResponse<T> : T>(
        url: string,
        body?: any,
        overrideOption?: HttpOption
    ): Promise<R>;
    /**
     * This method is use to make a http put request to external api and can override the default config
     * @param overrideOption override config for this method
     */
    async put<T = any, R = T extends Record<string, any> | number | string | boolean ? SuccessResponse<T> : T>(
        url: string,
        body?: any,
        overrideOption?: HttpOption
    ) {
        if ('config' in body || 'autoInject' in body) {
            overrideOption = body;
            body = null;
        }

        const {
            request: { scopeVariable },
        } = storage.getStore()!;

        const { autoInject, config } = this.getOption(overrideOption);
        try {
            let response = {} as AxiosResponse;
            if (autoInject) {
                const { requestId, tenantId, tenantCode, accessToken } = scopeVariable;
                if (requestId && tenantId && tenantCode && accessToken) {
                    const c = {
                        ...config,
                        headers: { ...config?.headers, requestId, tenantId, tenantCode, accessToken },
                    };
                    response = await axios.put(url, body, c);
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

    patch<T = any, R = T extends Record<string, any> | number | string | boolean ? SuccessResponse<T> : T>(
        url: string,
        overrideOption?: HttpOption
    ): Promise<R>;
    patch<T = any, R = T extends Record<string, any> | number | string | boolean ? SuccessResponse<T> : T>(
        url: string,
        body?: any,
        overrideOption?: HttpOption
    ): Promise<R>;
    /**
     * This method is use to make a http patch request to external api and can override the default config
     * @param overrideOption override config for this method
     */
    async patch<T = any, R = T extends Record<string, any> | number | string | boolean ? SuccessResponse<T> : T>(
        url: string,
        body?: any,
        overrideOption?: HttpOption
    ) {
        if ('config' in body || 'autoInject' in body) {
            overrideOption = body;
            body = null;
        }

        const {
            request: { scopeVariable },
        } = storage.getStore()!;

        const { autoInject, config } = this.getOption(overrideOption);
        try {
            let response = {} as AxiosResponse;
            if (autoInject) {
                const { requestId, tenantId, tenantCode, accessToken } = scopeVariable;
                if (requestId && tenantId && tenantCode && accessToken) {
                    const c = {
                        ...config,
                        headers: { ...config?.headers, requestId, tenantId, tenantCode, accessToken },
                    };
                    response = await axios.patch(url, body, c);
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
        overrideOption?: HttpOption
    ) {
        const {
            request: { scopeVariable },
        } = storage.getStore()!;
        const { autoInject, config } = this.getOption(overrideOption);
        try {
            let response = {} as AxiosResponse;
            if (autoInject) {
                const { requestId, tenantId, tenantCode, accessToken } = scopeVariable;
                if (requestId && tenantId && tenantCode && accessToken) {
                    const c = {
                        ...config,
                        headers: { ...config?.headers, requestId, tenantId, tenantCode, accessToken },
                    };
                    response = await axios.delete(url, c);
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
