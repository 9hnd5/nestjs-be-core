import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { BaseRepository } from '~/bases/base.repository';
import { OrderEntity } from '~/modules/order/entities/order.entity';

@Injectable()
export class OrderRepository extends BaseRepository<OrderEntity> {
    constructor(manager: EntityManager) {
        super(manager, OrderEntity);
    }
}
