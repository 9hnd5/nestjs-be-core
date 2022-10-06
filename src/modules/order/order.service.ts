import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OrderItemEntity } from '~/modules/order/entities/order-item.entity';
import { OrderEntity } from '~/modules/order/entities/order.entity';
import { OrderRepository } from '~/modules/order/order.repository';

@Injectable()
export class OrderService {
    constructor(private orderRepository: OrderRepository, private ds: DataSource) {}

    get() {
        return this.orderRepository.find();
    }

    post(data: any) {
        const order = new OrderEntity();
        order.description = data.description;
        order.totalDiscount = data.totalDiscount;

        const orderItem = new OrderItemEntity();
        orderItem.quantity = 1;
        orderItem.totalPrice = 1;
        orderItem.description = 'Description';

        order.items = [orderItem];
        this.orderRepository.save(order);
        throw new Error('err');
    }
    async put(data: any) {
        const order = await this.orderRepository.findOne({ where: { id: 19 } });
        if (order) {
            order.description = 'update description';
            order.totalDiscount = 1;

            const o1 = new OrderEntity();
            (o1.description = 'nudfsdf'), (o1.totalDiscount = 2);
            this.orderRepository.save([order, o1]);
        }
    }

    async delete() {
        const orders = await this.orderRepository.find();
        this.orderRepository.remove(orders);
    }

    postTransaction() {
        const repo = new OrderRepository(this.ds.createQueryRunner().manager);
        repo.save({} as any);
        repo.save({} as any);
        return;
    }
}
