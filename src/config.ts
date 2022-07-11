import { merge } from 'lodash';
import { CoreConfigModel } from 'models/common.model';
import * as config from '../config/config.json';

const defaultConfig = () => {
    const defaultConfig = new CoreConfigModel();

    defaultConfig.appName = String(process.env.APP_NAME);
    defaultConfig.redis = {
        host: String(process.env.REDIS_HOST),
        port: Number(process.env.REDIS_PORT),
        db: Number(process.env.REDIS_DB),
        password: process.env.REDIS_PASSWORD,
    };
    defaultConfig.jwt = {
        secret: 'super-secret',
        issuer: 'Comatic',
        expiresIn: '60s',
    };
    return defaultConfig;
};

export const load = (): CoreConfigModel => {
    return merge(defaultConfig(), config);
};

export const get = (key: string) => {
    const config = load();
    return config[key] as any;
};
