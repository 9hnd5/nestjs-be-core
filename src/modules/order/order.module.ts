import { Module } from '@nestjs/common';
import { OrderItemRepository } from '~/modules/order/order-item.repository';
import { OrderController } from '~/modules/order/order.controller';
import { OrderRepository } from '~/modules/order/order.repository';
import { OrderService } from '~/modules/order/order.service';

@Module({
    controllers: [OrderController],
    providers: [OrderService, OrderRepository, OrderItemRepository],
})
export class OrderModule {}
