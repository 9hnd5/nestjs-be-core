import { Controller, Get, Post, Put } from '@nestjs/common';
import { LocalAuthorize } from '~/modules/auth/decorators/local.decorator';
import { Permission } from '~/modules/auth/enums/permission.enum';
import { OrderEntity } from '~/modules/order/entities/order.entity';
import { OrderService } from '~/modules/order/order.service';

@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @LocalAuthorize('OrderManagement', Permission.View)
    @Get()
    getOrders() {
        return this.orderService.get();
    }

    @LocalAuthorize('OrderManagement', Permission.Insert)
    @Post()
    createOrder() {
        const data = new OrderEntity();
        return this.orderService.create(data);
    }

    @LocalAuthorize('OrderManagement', Permission.Insert)
    @Put()
    updateOrder() {
        return this.orderService.update();
    }
}
