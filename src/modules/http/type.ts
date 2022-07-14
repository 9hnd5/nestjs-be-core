import { AxiosRequestConfig } from 'axios';

export interface HttpOption {
    isGlobal?: boolean;
    autoInject?: boolean;
    config?: AxiosRequestConfig;
}
