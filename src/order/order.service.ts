import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentService } from 'src/payment/payment.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderEntity: Repository<OrderEntity>,
        private readonly paymentService: PaymentService
    ){}


    async createOrder(createOrderDto: CreateOrderDto, cartId: number){

        await this.paymentService.createPayment(createOrderDto);
        return null;
    }
}
