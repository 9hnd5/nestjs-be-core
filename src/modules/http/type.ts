import { AxiosRequestConfig } from 'axios';

export interface HttpOption {
    url: string;
    autoInject: boolean;
    config?: AxiosRequestConfig;
}
