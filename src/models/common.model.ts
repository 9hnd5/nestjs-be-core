import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';
import { merge } from 'lodash';
import { storage } from '~/storage';
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

export abstract class AuditEntity {
    @Column({ name: 'is_deleted', type: Boolean, default: false })
    isDeleted: boolean;
    @Column({ name: 'created_date', type: Date })
    createdDate: Date;
    @Column({ name: 'created_by', type: Number })
    createdBy: number;
    @Column({ name: 'modified_date', type: Date, nullable: true })
    modifiedDate?: Date;
    @Column({ name: 'modified_by', type: Number, nullable: true })
    modifiedBy?: number;

    @BeforeUpdate()
    protected beforeUpdate() {
        const {
            request: {
                scopeVariable: { session },
            },
        } = storage.getStore()!;
        this.modifiedDate = new Date();
        if (typeof session?.userId === 'number') this.modifiedBy = session.userId;
        else this.modifiedBy = 0;
    }

    @BeforeInsert()
    protected beforeInsert() {
        const {
            request: {
                scopeVariable: { session },
            },
        } = storage.getStore()!;
        this.createdDate = new Date();
        if (typeof session?.userId === 'number') this.createdBy = session.userId;
        else this.createdBy = 0;
    }
}

export abstract class TenantEntity extends AuditEntity {
    @Column({ name: 'company_id', type: Number })
    companyId: number;
}

export type AddType<T> = Omit<
    T,
    'createdDate' | 'createdBy' | 'modifiedDate' | 'modifiedBy' | 'isDeleted' | 'companyId'
>;

export type UpdateType<T> = AddType<T>;
export abstract class AggregateRoot<T extends { id: number }> {
    protected entity: T;

    get id() {
        return this.entity.id;
    }

    constructor(entity: Partial<T>) {
        this.entity = merge(this.entity, entity);
    }

    toEntity() {
        return this.entity;
    }
}

export class TenantModel {
    @Column({ name: 'company_id', type: 'int', default: -1, nullable: false })
    public companyId: number;
}

export class Session {
    public userId: number | string;
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
    [key: string]: unknown;
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
