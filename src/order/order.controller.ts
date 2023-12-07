import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CreateOrderDto } from './dtos/create-order.dto';
import { ReturnOrderDto } from './dtos/return-order.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './order.service';

@Roles(UserType.Admin, UserType.User)
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


    @Roles(UserType.Admin)
    @Get('/all')
    async findAllOrders(): Promise<ReturnOrderDto[]> {
        return ( await this.orderService.findAllOrders()).map(
            (order) => new ReturnOrderDto(order)
        );
    }


    @Roles(UserType.Admin)
    @Get('/:orderId')
    async findOrderById(
        @Param('orderId') orderId: number
    ): Promise<ReturnOrderDto[]> {
        return ( await this.orderService.findOrderByUserId(undefined, orderId)).map(
            (order) => new ReturnOrderDto(order)
        );
    }

}
