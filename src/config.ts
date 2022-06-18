import * as config from '../config/config.json'
import { merge } from 'lodash'

export class CoreConfigModel {
    appName: string;
    primarySQLConnectionString: string;
    secondarySQLConnectionString: string;
    redis: {
        host: string,
        port: number,
        db: number,
        password?: string
    }
}

const defaultConfig = () => {
    const defaultConfig = new CoreConfigModel()
    defaultConfig.appName = String(process.env.APP_NAME)
    defaultConfig.primarySQLConnectionString = String(process.env.PRIMARY_CONNECTION_STRING)
    defaultConfig.secondarySQLConnectionString = String(process.env.SECONDARY_CONNECTION_STRING)
    defaultConfig.redis = {
        host: String(process.env.REDIS_HOST),
        port: Number(process.env.REDIS_PORT),
        db: Number(process.env.REDIS_DB),
        password: process.env.REDIS_PASSWORD
    }
    return defaultConfig;
}

export const load = (): CoreConfigModel => {
    return merge(defaultConfig(), config)
}

export const get = (key: string) => {
    const config = load();
    return config[key] as any
}