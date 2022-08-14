import * as path from 'path';
import { DataSource } from 'typeorm';
import { get } from '~/config';
const option = get('primarySQLConnection');
export const dataSource = new DataSource({
    type: 'mysql',
    host: option['host'],
    port: option['port'],
    username: option['username'],
    password: option['password'],
    database: `comatic_${process.env.tenantCode as string}`,
    entities: [process.env.entities as string],
    migrations: [path.join(__dirname, './', 'migra/*.js')],
    synchronize: false,
});
