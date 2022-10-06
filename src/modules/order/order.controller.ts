import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { LocalAuthorize } from '~/modules/auth/decorators/local.decorator';
import { Permission } from '~/modules/auth/enums/permission.enum';
import { OrderService } from '~/modules/order/order.service';

@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @LocalAuthorize('OrderManagement', Permission.Insert)
    @Post()
    createOrder(@Body() data: any) {
        return this.orderService.post(data);
    }

    @LocalAuthorize('OrderManagement', Permission.View)
    @Get()
    getOrders() {
        return this.orderService.get();
    }
    @LocalAuthorize('OrderManagement', Permission.Update)
    @Put()
    updateOrder() {
        return this.orderService.put({});
    }
    @LocalAuthorize('OrderManagement', Permission.Delete)
    @Delete()
    deleteOrders() {
        return this.orderService.delete();
    }
}
