import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { BaseRepository } from '~/bases/base.repository';
import { OrderItemEntity } from '~/modules/order/entities/order-item.entity';

@Injectable()
export class OrderItemRepository extends BaseRepository<OrderItemEntity> {
    constructor(manager: EntityManager) {
        super(manager, OrderItemEntity);
    }
}
