import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { merge } from 'lodash';
import { Column, DeleteDateColumn } from 'typeorm';
/**
 * @deprecated
 */
export class Base {
    isDeleted: boolean;
    createdDate: Date;
    createdBy: number;
    modifiedDate?: Date;
    modifiedBy?: number;
}

/**
 * @deprecated
 */
export class TenantBase extends Base {
    public companyId: number;
}

export class BaseEntity {}

export class AuditEntity extends BaseEntity {
    constructor() {
        super();
        this.isDeleted = false;
        this.createdBy = 0;
        this.createdDate = new Date();
        this.modifiedBy = undefined;
        this.modifiedDate = undefined;
    }
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

    // @BeforeUpdate()
    // protected beforeUpdate() {
    //     const store = storage.getStore();
    //     if (store && store.request && store.request?.scopeVariable) {
    //         console.log('store', store);

    //         const {
    //             request: {
    //                 scopeVariable: { session },
    //             },
    //         } = store;
    //         this.modifiedDate = new Date();
    //         if (typeof session?.userId === 'number') this.modifiedBy = session.userId;
    //         else this.modifiedBy = 0;
    //     }
    // }

    // @BeforeInsert()
    // protected beforeInsert() {
    //     const store = storage.getStore();
    //     if (store && store.request && store.request?.scopeVariable) {
    //         const {
    //             request: {
    //                 scopeVariable: { session },
    //             },
    //         } = store;
    //         this.createdDate = new Date();
    //         if (typeof session?.userId === 'number') this.createdBy = session.userId;
    //         else this.createdBy = 0;
    //     }
    // }
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

/**
 * @deprecated
 */
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
