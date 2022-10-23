import { Inject, Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isArray } from 'lodash';
import * as mysql from 'mysql2/promise';
import { DataSource } from 'typeorm';
import { DatabaseOption } from '~/models/common.model';
import { MODULE_OPTIONS_TOKEN } from '~/modules/migration/const';
import AddMigration from '~/modules/migration/dtos/add-migration.dto';
import { MigrationOption } from '~/modules/migration/type';

@Injectable()
export class MigrationService implements OnModuleInit {
    private tenantPool: mysql.Pool;
    private servicePool: mysql.Pool;
    private tenantOption: DatabaseOption;
    private serviceOption: DatabaseOption;
    constructor(@Inject(MODULE_OPTIONS_TOKEN) private option: MigrationOption, configService: ConfigService) {
        this.tenantOption = configService.get<DatabaseOption>('tenantSQLConnection') as DatabaseOption;
        this.serviceOption = configService.get<DatabaseOption>('primarySQLConnection') as DatabaseOption;

        this.tenantPool = mysql.createPool({
            host: this.tenantOption['host'],
            port: this.tenantOption['port'],
            user: this.tenantOption['username'],
            database: this.tenantOption['database'],
            password: this.tenantOption['password'],
        });
        this.servicePool = mysql.createPool({
            host: this.serviceOption['host'],
            port: this.serviceOption['port'],
            user: this.serviceOption['username'],
            password: this.serviceOption['password'],
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
        if (this.option.tenantCodes) {
            for (const code of this.option.tenantCodes) {
                await this.migration(code);
            }
            return;
        }

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
        const db: string = this.serviceOption['database'].replace('{0}', tenantCode);
        const conn = await this.servicePool.getConnection();
        const dataSource = new DataSource({
            type: this.serviceOption['type'],
            host: this.serviceOption['host'],
            port: this.serviceOption['port'],
            password: this.serviceOption['password'],
            username: this.serviceOption['username'],
            database: db,
            migrations: [this.option.migrationDir],
            synchronize: false,
        });
        try {
            //Try create database first
            await conn.execute(
                `CREATE DATABASE IF NOT EXISTS \`${db}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
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
