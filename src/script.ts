import { InternalServerErrorException } from '@nestjs/common';
import * as child from 'child_process';
import * as fs from 'fs';
import { isArray, isEmpty } from 'lodash';
import * as mysql from 'mysql2/promise';
import * as path from 'path';
import * as util from 'util';
import { get } from '~/config';

const exec = util.promisify(child.exec);
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

export const migration = async (tenantCode: string, entities: string, dirname: string = __dirname) => {
    console.log('__dirname', dirname);
    const conn = await servicePool.getConnection();
    const [response] = await conn.execute(`SHOW DATABASES LIKE 'comatic_${tenantCode}'`);
    if (isEmpty(response)) {
        try {
            //Try create database first
            await conn.execute(
                `CREATE DATABASE IF NOT EXISTS \`comatic_${tenantCode}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;`
            );
            //Generate migration schema
            const generateCommand = `npx typeorm migration:generate -o -d ${dirname}/ds.js migra/initDB -- tenantCode=${tenantCode} entities=${entities}`;
            const generateResult = await exec(generateCommand, {
                cwd: dirname,
            });
            console.log(generateResult.stdout);
            console.log(generateResult.stderr);

            const migrationCommand = `npx typeorm migration:run -d ${dirname}/ds.js -- tenantCode=${tenantCode} entities=${entities}`;
            const migrationResult = await exec(migrationCommand, {
                cwd: dirname,
            });
            console.log(migrationResult.stdout);
            console.log(migrationResult.stderr);

            fs.rm(path.resolve(dirname, 'migra'), { recursive: true, maxRetries: 5 }, (e) => {});
        } catch (er) {
            //If there are any error occur. Rollback by remove the database was created before
            await conn.execute(`DROP DATABASE IF EXISTS \`comatic_${tenantCode}\`;`);
            throw new InternalServerErrorException(er);
        } finally {
            conn.release();
        }
    } else {
        conn.release();
    }
};

export const applyMigration = async (entities: string) => {
    const conn = await tenantPool.getConnection();
    const [rows] = await conn.query('select * from saaspiens_company');
    if (isArray(rows)) {
        for (const { code } of rows as Array<{ code: string }>) {
            await migration(code, entities);
        }
    }
    conn.release();
    process.exit();
};
