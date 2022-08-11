import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Column } from 'typeorm';

/**
 * @deprecated in future, please consider use Base instead
 */
export class BaseModel {
    @Column({ name: 'is_deleted', type: 'boolean', nullable: false })
    public isDeleted: boolean;

    @Column({ name: 'created_date', type: 'date', nullable: false })
    public createdDate: Date;

    @Column({ name: 'created_by', type: 'int', nullable: false })
    public createdBy: number;

    @Column({ name: 'modified_date', type: 'date', nullable: true })
    public modifiedDate: Date;

    @Column({ name: 'modified_by', type: 'int', nullable: true })
    public modifiedBy: number;
}
export class Base {
    isDeleted: boolean;
    createdDate: Date;
    createdBy: number;
    modifiedDate?: Date;
    modifiedBy?: number;
}
/**
 * @deprecated in future, please consider use TenantBase instead
 */
export class TenantBaseModel extends BaseModel {
    @Column({ name: 'company_id', type: 'int', default: -1, nullable: false })
    public companyId: number;
}

export class TenantBase extends Base {
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
    accessToken?: string;
    refreshToken?: string;
    appName?: string;
    appBuildNumber?: number | string;
    requestId?: string;
    tenantCode?: string;
    tenantId?: number;
    primary?: DatabaseOption;
    secondary?: DatabaseOption;

    // session
    session?: Session;
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

/**
 * @deprecated in future, please consider use QueryBase instead
 */
export abstract class QueryModel {
    @Expose()
    @Transform(({ value }) => (value ? +value : 1))
    @IsNumber()
    @Min(1)
    @IsOptional()
    pageIndex: number;

    @Expose()
    @Transform(({ value }) => (value ? +value : 10))
    @IsNumber()
    @Max(100)
    @IsOptional()
    pageSize: number;
}

export abstract class QueryBase {
    @Expose()
    @Transform(({ value }) => (value ? +value : 1))
    @IsNumber()
    @Min(1)
    @IsOptional()
    pageIndex: number;

    @Expose()
    @Transform(({ value }) => (value ? +value : 10))
    @IsNumber()
    @Max(100)
    @IsOptional()
    pageSize: number;
}
