import { InternalServerErrorException } from '@nestjs/common';
import { isArray } from 'lodash';
import * as mysql from 'mysql2/promise';
import { DataSource } from 'typeorm';
import { get } from '~/config';

const tenantOption = get('tenantSQLConnection');
const tenantPool = mysql.createPool({
    host: tenantOption['host'],
    port: tenantOption['port'],
    user: tenantOption['username'],
    database: tenantOption['database'],
    password: tenantOption['password'],
});
const serviceOption = get('primarySQLConnection');
const servicePool = mysql.createPool({
    host: serviceOption['host'],
    port: serviceOption['port'],
    user: serviceOption['username'],
    password: serviceOption['password'],
});

export const migration = async (tenantCode: string) => {
    const conn = await servicePool.getConnection();
    const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: `comatic_${tenantCode}`,
        migrations: [__dirname + '/migrations/*.{ts,js}'],
        synchronize: false,
    });
    try {
        //Try create database first
        await conn.execute(
            `CREATE DATABASE IF NOT EXISTS \`comatic_${tenantCode}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;`
        );
        await dataSource.initialize();
        await dataSource.runMigrations();
    } catch (er) {
        //If there are any error occur. Rollback by remove the database was created before
        throw new InternalServerErrorException(er);
    } finally {
        conn.release();
        await dataSource.destroy();
    }
};

export const applyMigration = async () => {
    const conn = await tenantPool.getConnection();
    const [rows] = await conn.query('select * from saaspiens_company');

    if (isArray(rows)) {
        for (const { code } of rows as Array<{ code: string }>) {
            await migration(code);
            // break;
        }
    }
    conn.release();
    process.exit();
};
