import { AxiosRequestConfig } from 'axios';

export interface HttpOption {
    autoInject?: boolean;
    config?: AxiosRequestConfig;
}
