import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { OrderProductEntity } from 'src/order-product/entities/order-product.entity';
import { OrderProductService } from 'src/order-product/order-product.service';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { PaymentService } from 'src/payment/payment.service';
import { ProductEntity } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { OrderedBulkOperation, Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        private readonly paymentService: PaymentService,
        private readonly cartService: CartService,
        private readonly orderProductService: OrderProductService,
        private readonly productService: ProductService
    ){}
    
    
    async saveOrder(createOrderDto: CreateOrderDto, userId: number, payment: PaymentEntity): Promise<OrderEntity>{

        return await this.orderRepository.save({
            addressId: createOrderDto.addressId,
            date: new Date(),
            paymentId: payment.id,
            userId,
        });

    }


    async createOrderProductUsingCart(cart: CartEntity, orderId: number, products: ProductEntity[]): Promise<OrderProductEntity[]>{

        return Promise.all(
            cart.cartProduct?.map((cartProduct) => 
                this.orderProductService.createOrderProduct(
                    cartProduct.productId,
                    orderId,
                    products.find((product) => product.id === cartProduct.productId)?.price || 0,
                    cartProduct.amount
                ),
            ),
        );
    }


    async createOrder(createOrderDto: CreateOrderDto, userId: number): Promise<OrderEntity>{

        const cart = await this.cartService.findCartByUserId(userId, true);

        //convertendo o array cartProduct para outra array do tipo map somente com productId
        const products = await this.productService.findAll(
            cart.cartProduct?.map((cartProduct) => cartProduct.productId)
        )

        const payment: PaymentEntity = await this.paymentService.createPayment(
            createOrderDto,
            products,
            cart
        );

        const order = await this.saveOrder(createOrderDto, userId, payment);
        
        await this.createOrderProductUsingCart(cart, order.id, products);

        await this.cartService.clearCart(userId);
        
        return order;
    }


    async findOrderByUserId(userId?: number, orderId?: number): Promise<OrderEntity[]>{

        const orders = await this.orderRepository.find({
            where: {
                userId,
                id: orderId
            },
            relations: {
                address: {
                    city: {
                        state: true,
                    }
                },
                ordersProduct:{
                    product: true
                },
                payment: {
                    paymentStatus: true,    
                },
                user: !!orderId  
            }
        });

        if (!orders || orders.length === 0 ){
            throw new NotFoundException('Nenhuma pedido encontrado.')
        }

        return orders;
    }


    async findAllOrders(): Promise<OrderEntity[]>{

        const orders = await this.orderRepository.find({
            relations: {
                user: true,
            }
        });

        if (!orders || orders.length === 0){
            
            throw new NotFoundException('Nenhum pedido encontrado!');
        }

        const ordersProduct = await this.orderProductService.findAmountProductByOrderId(orders.map((order) => order.id));

        return orders.map((order) => {
            const orderProduct = ordersProduct.find(
                (currentOrder) => currentOrder.order_id === order.id
            );

            if(orderProduct){
                return {
                    ...order,
                    amountProducts: Number(orderProduct.total)
                };
            }
            return order;
        });
    }


}
