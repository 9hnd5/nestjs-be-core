import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { Column } from 'typeorm';

export class BaseModel {
    @Column({ name: 'is_deleted', type: 'boolean', nullable: false })
    public isDeleted: boolean;

    @Column({ name: 'created_date', type: 'datetime', nullable: false })
    public createdDate: Date;

    @Column({ name: 'created_by', type: 'int', nullable: false })
    public createdBy: number;

    @Column({ name: 'modified_date', type: 'datetime' })
    public modifiedDate: Date;

    @Column({ name: 'modified_by', type: 'int' })
    public modifiedBy: number;
}

export class TenantBaseModel extends BaseModel {
    @Column({ name: 'company_id', type: 'int', default: -1, nullable: false })
    public companyId: number;
}

export class TenantModel {
    @Column({ name: 'company_id', type: 'int', default: -1, nullable: false })
    public companyId: number;
}

export class Session {
    public userId: number;
    public roles: {
        id: number;
        name: string;
    }[];
    public allPermissionFeatures: string[];
    public insertPermissionFeatures: string[];
    public updatePermissionFeatures: string[];
    public deletePermissionFeatures: string[];
    public viewPermissionFeatures: string[];
}

export class ScopeVariable {
    accessToken: string;
    refreshToken: string;
    appName: string;
    appBuildNumber: number;
    requestId: string;
    tenantCode: string;
    tenantId: number;
    primary: DatabaseOption;
    secondary: DatabaseOption;

    // session
    session: Session;
}

export abstract class Paginated<T> {
    pageIndex: number;
    pageSize: number;
    totalRow: number;
    dataSource: T[];
}

export class DatabaseOption {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export class CoreConfigModel {
    appName: string;
    primarySQLConnection: DatabaseOption;
    secondarySQLConnection: DatabaseOption;
    redis: {
        host: string;
        port: number;
        db: number;
        password?: string;
    };
    jwt: {
        secret?: string;
        issuer?: string;
        expiresIn?: string;
    };
}

export abstract class QueryModel {
    @Transform(({ value }) => +value)
    @IsNumber()
    pageIndex = 1;
    @Transform(({ value }) => +value)
    @IsNumber()
    pageSize = 10;
}
