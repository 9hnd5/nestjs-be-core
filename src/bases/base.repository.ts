import { Injectable } from '@nestjs/common';
import { merge } from 'lodash';
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
@Injectable()
export abstract class BaseRepository<Entity extends BaseEntity & { id: any }> {
    protected repository: Repository<Entity>;
    protected properties: ObjectLiteral;
    constructor(entityManager: EntityManager, target: Target<Entity>) {
        this.repository = entityManager.getRepository(target);
        this.properties = this.repository.metadata.propertiesMap;
    }

    find(options?: FindManyOptions<Entity>) {
        if ('isDeleted' in this.properties) {
            return this.repository.find(merge(options, { where: { isDeleted: false } }));
        }

        return this.repository.find(options);
    }

    findAndCount(options: FindManyOptions<Entity>) {
        if ('isDeleted' in this.properties) {
            return this.repository.findAndCount(merge(options, { where: { isDeleted: false } }));
        }
        return this.find(options);
    }

    findAndCountBy(options: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]) {
        if ('length' in options) {
            if ('isDeleted' in this.properties) {
                const mapOptions = options.map((x) => ({ ...x, isDeleted: false }));
                return this.repository.findAndCountBy(mapOptions);
            }
        } else {
            if ('isDeleted' in this.properties) {
                return this.repository.findAndCountBy(merge(options, { isDeleted: false }));
            }
        }
        return this.repository.findAndCountBy(options);
    }

    findOne(options: FindOneOptions<Entity>) {
        if ('isDeleted' in this.properties) {
            return this.repository.findOne(merge(options, { where: { isDeleted: false } }));
        }
    }

    /**
     *
     * @param entities Save list of entities
     * @param options
     */
    save<T extends DeepPartial<Entity>>(
        entities: T[],
        options: SaveOptions & {
            reload: false;
        }
    ): Promise<T[]>;
    /**
     *
     * @param entities Save list of entities
     * @param options
     */
    save<T extends DeepPartial<Entity>>(entities: T[], options?: SaveOptions): Promise<(T & Entity)[]>;
    /**
     *
     * @param entity Save single entity
     * @param options
     */
    save<T extends DeepPartial<Entity>>(
        entity: T,
        options: SaveOptions & {
            reload: false;
        }
    ): Promise<T>;
    /**
     *
     * @param entity Save single entity
     * @param options
     */
    save<T extends DeepPartial<Entity>>(entity: T, options?: SaveOptions): Promise<T & Entity>;
    save<T extends DeepPartial<Entity>>(data: T | T[], options?: SaveOptions | (SaveOptions & { reload: false })) {
        const {
            request: {
                scopeVariable: { session },
            },
        } = storage.getStore()!;
        if ('length' in data) {
            let mappedData: T[];
            if (this.isAuditEntity() && !data['id']) {
                mappedData = data.map((x) => ({ ...x, createdBy: session?.userId, createdDate: new Date() }));
            } else {
                mappedData = data.map((x) => ({ ...x, modifiedBy: session?.userId, modifiedDate: new Date() }));
            }
            return this.repository.save(mappedData, options);
        } else {
            if (this.isAuditEntity() && !data['id']) {
                data['createdBy'] = session?.userId;
                data['createdDate'] = new Date();
            } else {
                data['modifiedBy'] = session?.userId;
                data['modifiedDate'] = new Date();
            }
            return this.repository.save(data, options);
        }
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

    /**
     *
     * @param entity Remove single entity. If the entity schema have isDeleted column, it will be soft delete, otherwise it will
     * remove real record in database
     * @param options option delete from typeorm
     */
    remove(entity: Entity, options?: RemoveOptions): Promise<Entity>;
    /**
     *
     * @param entities Remove list of entity. If the entity schema have isDeleted column, it will be soft delete, otherwise it will
     * remove real record in database
     * @param options option delete from typeorm
     */
    remove(entities: Entity[], options?: RemoveOptions): Promise<Entity[]>;
    remove(data: Entity[] | Entity, options?: RemoveOptions) {
        if ('length' in data) {
            if (this.isAuditEntity()) {
                return this.softRemove(data);
            }
            return this.repository.remove(data, options);
        } else {
            if (this.isAuditEntity()) {
                return this.softRemove(data);
            }
            return this.repository.remove(data, options);
        }
    }
    /**
     *
     * @param entity Soft delete single entity, mark column isDeleted = true, it required that the entity schema must have
     * column isDeleted
     */
    softRemove<T extends DeepPartial<Entity>>(entity: T): T;
    /**
     *
     * @param entities Soft delete list of entity, mark column isDeleted = true, it required that the entity schema must have
     * column isDeleted
     */
    softRemove<T extends DeepPartial<Entity>>(entities: T[]): T[];
    softRemove<T extends DeepPartial<Entity>>(data: T | T[]) {
        const {
            request: {
                scopeVariable: { session },
            },
        } = storage.getStore()!;
        if (this.isAuditEntity()) {
            if ('length' in data) {
                const dataDeleted = data.map((entity) => ({
                    ...entity,
                    isDeleted: true,
                    modifiedBy: session?.userId,
                    modifiedDate: new Date(),
                }));
                this.repository.save(dataDeleted);
                return dataDeleted;
            } else {
                data['isDeleted'] = true;
                data['modifiedBy'] = session?.userId;
                data['modifiedDate'] = new Date();
                this.repository.save(data);
                return data;
            }
        } else return new Error('Entity cant be soft delete');
    }

    createQuerybuild(alias?: string, queryRunner?: QueryRunner) {
        return this.repository.createQueryBuilder(alias, queryRunner);
    }
}
