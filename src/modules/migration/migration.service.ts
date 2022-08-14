import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { execSync } from 'child_process';
import * as fs from 'fs';
import { isEmpty } from 'lodash';
import * as mysql from 'mysql2/promise';
import * as path from 'path';
import { get } from '~/config';
import { MODULE_OPTIONS_TOKEN } from '~/modules/migration/const';
import AddMigration from '~/modules/migration/dtos/add-migration.dto';
import { MigrationOption } from '~/modules/migration/type';

const generateCommand = `npx typeorm migration:generate -o -d ${path.resolve(__dirname, 'ds.js')} migra/initDB`;
const migrationCommand = `npx typeorm migration:run -d ${path.resolve(__dirname, 'ds.js')}`;

@Injectable()
export class MigrationService {
    constructor(@Inject(MODULE_OPTIONS_TOKEN) private migrationOption: MigrationOption) {}

    async addMigration(data: AddMigration) {
        const { tenantCode } = data;
        process.env.tenantCode = tenantCode;
        process.env.entities = this.migrationOption.entities;
        const option = get('primarySQLConnection');
        const pool = mysql.createPool({
            host: option['host'],
            port: option['port'],
            user: option['username'],
            password: option['password'],
        });
        const connection = await pool.getConnection();
        const [response] = await connection.execute(`SHOW DATABASES LIKE 'comatic_${tenantCode}'`);
        if (isEmpty(response)) {
            try {
                //Try create database first
                await connection.execute(`CREATE DATABASE IF NOT EXISTS comatic_${tenantCode};`);

                //Generate migration schema
                const generateProcess = execSync(generateCommand, {
                    cwd: path.resolve(__dirname),
                });

                //Apply migration schema to database
                const migrateProcess = execSync(migrationCommand, {
                    cwd: path.resolve(__dirname),
                });

                //Cleaning
                fs.rm(path.resolve(__dirname, 'migra'), { recursive: true, maxRetries: 5 }, (e) => {
                    console.log(e);
                });
            } catch (er) {
                //If there are any error occur. Rollback by remove the database was created before
                await connection.execute(`DROP DATABASE IF EXISTS comatic_${tenantCode};`);
                throw new InternalServerErrorException(er);
            } finally {
                connection.release();
            }
        } else {
            connection.release();
        }
    }
}
