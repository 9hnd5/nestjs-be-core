import { cloneDeepWith, merge } from 'lodash';
import {
    DeepPartial,
    EntityManager,
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
    ObjectLiteral,
    QueryRunner,
    RemoveOptions,
    Repository,
    SaveOptions,
} from 'typeorm';
import { BaseEntity } from '~/models/common.model';
import { storage } from '~/storage';

type Target<T = unknown> = new (...args: any[]) => T;

class CommonRepository<Entity extends BaseEntity> {
    protected repository: Repository<Entity>;
    protected properties: ObjectLiteral;
    protected constructor(entityManager: EntityManager, target: Target<Entity>, type: 'mongo' | 'sql') {
        this.repository =
            type === 'sql' ? entityManager.getRepository(target) : entityManager.getMongoRepository(target);
        this.properties = this.repository.metadata.propertiesMap;
    }

    find(options?: FindManyOptions<Entity>) {
        if ('isDeleted' in this.properties) {
            return this.repository.find(merge(options, { where: { isDeleted: false } }));
        }

        return this.repository.find(options);
    }

    findOne(options: FindOneOptions<Entity>) {
        if ('isDeleted' in this.properties) {
            return this.repository.findOne(merge(options, { where: { isDeleted: false } }));
        }
    }

    findAndCount(options: FindManyOptions<Entity>) {
        if ('isDeleted' in this.properties) {
            return this.repository.findAndCount(merge(options, { where: { isDeleted: false } }));
        }
        return this.find(options);
    }

    findAndCountBy(options: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]) {
        if (Array.isArray(options) && 'isDeleted' in this.properties) {
            const mapOptions = options.map((x) => ({ ...x, isDeleted: false }));
            return this.repository.findAndCountBy(mapOptions);
        } else if ('isDeleted' in this.properties) {
            return this.repository.findAndCountBy(merge(options, { isDeleted: false }));
        } else {
            return this.repository.findAndCountBy(options);
        }
    }

    save<T extends DeepPartial<Entity>>(data: T | T[], options?: SaveOptions | (SaveOptions & { reload: false })) {
        const context = storage.getStore();
        const userId = context?.request?.scopeVariable?.session?.userId ?? 0;
        const cloneData = cloneDeepWith(data, function (_, key, ob) {
            if (key === 'createdBy' && !ob?.['id']) return userId;
            if (key === 'createdDate' && !ob?.['id']) return new Date();
            if (key === 'modifiedBy' && ob?.['id']) return userId;
            if (key === 'modifiedDate' && ob?.['id']) return new Date();
        });
        return this.repository.save(cloneData, options);
    }

    remove(data: Entity | Entity[], options?: RemoveOptions) {
        if (this.isAuditEntity()) {
            return this.softRemove(data);
        } else {
            if (Array.isArray(data)) {
                return this.repository.remove(data, options);
            } else {
                return this.repository.remove(data);
            }
        }
    }

    softRemove(data: Entity | Entity[]) {
        const context = storage.getStore();
        const userId = context?.request?.scopeVariable?.session?.userId ?? 0;

        const cloneData = cloneDeepWith(data, (_, key) => {
            if (key === 'isDeleted') return true;
            if (key === 'modifiedBy') return userId;
            if (key === 'modifiedDate') return new Date();
        });

        this.repository.save(cloneData);
    }

    private isAuditEntity() {
        if (
            'createdBy' in this.properties &&
            'createdDate' in this.properties &&
            'modifiedBy' in this.properties &&
            'modifiedDate' in this.properties
        )
            return true;
        return false;
    }
}

export abstract class BaseRepository<Entity extends ObjectLiteral> extends CommonRepository<Entity> {
    constructor(manager: EntityManager, target: Target<Entity>) {
        super(manager, target, 'sql');
    }
    createQueryBuilder(alias?: string, queryRunner?: QueryRunner) {
        return this.repository.createQueryBuilder(alias, queryRunner);
    }
}

export abstract class BaseMongoRepository<Entity extends ObjectLiteral> extends CommonRepository<Entity> {
    constructor(manager: EntityManager, target: Target<Entity>) {
        super(manager, target, 'mongo');
    }
}
