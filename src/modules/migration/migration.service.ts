import { Inject, Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { isArray } from 'lodash';
import * as mysql from 'mysql2/promise';
import { DataSource } from 'typeorm';
import { get } from '~/config';
import { MODULE_OPTIONS_TOKEN } from '~/modules/migration/const';
import AddMigration from '~/modules/migration/dtos/add-migration.dto';
import { MigrationOption } from '~/modules/migration/type';

const tenantOption = get('tenantSQLConnection');
const serviceOption = get('primarySQLConnection');

@Injectable()
export class MigrationService implements OnModuleInit {
    private tenantPool: mysql.Pool;
    private servicePool: mysql.Pool;
    constructor(@Inject(MODULE_OPTIONS_TOKEN) private option: MigrationOption) {
        this.tenantPool = mysql.createPool({
            host: tenantOption['host'],
            port: tenantOption['port'],
            user: tenantOption['username'],
            database: tenantOption['database'],
            password: tenantOption['password'],
        });
        this.servicePool = mysql.createPool({
            host: serviceOption['host'],
            port: serviceOption['port'],
            user: serviceOption['username'],
            password: serviceOption['password'],
        });
    }
    async onModuleInit() {
        await this.applyMigration();
    }

    async addMigration(data: AddMigration) {
        const { tenantCode } = data;
        await this.migration(tenantCode);
    }

    private async applyMigration() {
        const conn = await this.tenantPool.getConnection();
        const [rows] = await conn.query('select * from saaspiens_company');

        if (isArray(rows)) {
            for (const { code } of rows as Array<{ code: string }>) {
                await this.migration(code);
            }
        }

        conn.release();
    }

    private async migration(tenantCode: string) {
        const conn = await this.servicePool.getConnection();
        const dataSource = new DataSource({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: `comatic_${tenantCode}`,
            migrations: [this.option.migrationDir],
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
            throw new InternalServerErrorException(er);
        } finally {
            conn.release();
            await dataSource.destroy();
        }
    }
}
