import { Injectable } from '@nestjs/common';
import { merge } from 'lodash';
import {
    EntityManager,
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
    QueryRunner,
    Repository,
    SaveOptions,
} from 'typeorm';
import { BaseEntity } from '~/models/common.model';
type Target<T = unknown> = new (...args: any[]) => T;
@Injectable()
export abstract class BaseRepository<Entity extends BaseEntity> {
    protected repository: Repository<Entity>;
    private overrideOption: any;
    constructor(entityManager: EntityManager, target: Target<Entity>) {
        this.repository = entityManager.getRepository(target);
        const properties = this.repository.metadata.propertiesMap;
        if ('isDeleted' in properties) {
            this.overrideOption = {
                where: {
                    isDeleted: false,
                },
            };
        }
    }

    find(options?: FindManyOptions<Entity>) {
        return this.repository.find(merge(options, this.overrideOption));
    }

    findAndCount(options: FindManyOptions<Entity>) {
        return this.repository.findAndCount(merge(options, this.overrideOption));
    }

    findAndCountBy(options: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]) {
        return this.repository.findAndCountBy(options);
    }

    findOne(options: FindOneOptions<Entity>) {
        return this.repository.findOne(merge(options, this.overrideOption));
    }

    save(entity: Entity, options?: SaveOptions) {
        return this.repository.save(entity, options);
    }

    createQuerybuild(alias?: string, queryRunner?: QueryRunner) {
        return this.repository.createQueryBuilder(alias, queryRunner);
    }
}
