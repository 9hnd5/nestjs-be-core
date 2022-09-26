import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OrderEntity } from '~/modules/order/entities/order.entity';
import { OrderRepository } from '~/modules/order/order.repository';

@Injectable()
export class OrderService {
    constructor(private orderRepository: OrderRepository, private ds: DataSource) {}

    get() {
        return this.orderRepository.find();
    }

    create(data: OrderEntity) {
        return this.orderRepository.save(data);
    }

    async update() {
        const data = await this.orderRepository.findOne({ where: { id: 2 } });
        return data && this.orderRepository.save(data);
    }
}
