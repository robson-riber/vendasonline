import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserId } from 'src/decorators/user-id.decorator';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {

    constructor(
        private readonly orderService: OrderService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async createOrder(
        @Body() createOrderDto: CreateOrderDto,
        @UserId() userId: number
    ){
        return this.orderService.createOrder(createOrderDto, userId)
    }

    @Get()
    async findOrdersByUserId(
        @UserId() userId: number
    ): Promise<OrderEntity[]> {

        return this.orderService.findOrderByUserId(userId);
    }

}
