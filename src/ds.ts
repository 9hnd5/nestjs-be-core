import * as path from 'path';
import { DataSource } from 'typeorm';
import { get } from '~/config';
import { argv } from 'process';
let tenantCode = '';
let entities = '';
for (const a of argv) {
    const index1 = a.indexOf('tenantCode=');
    const index2 = a.indexOf('entities=');
    if (index1 >= 0) {
        tenantCode = a.slice(11);
    }
    if (index2 >= 0) {
        entities = a.slice(9);
    }
}
const option = get('primarySQLConnection');
export const dataSource = new DataSource({
    type: 'mysql',
    host: option['host'],
    port: option['port'],
    username: option['username'],
    password: option['password'],
    database: `comatic_${tenantCode}`,
    entities: [entities],
    migrations: [path.join(__dirname, './', 'migra/*.js')],
    synchronize: false,
});
