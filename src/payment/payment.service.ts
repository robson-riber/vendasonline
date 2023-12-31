import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductEntity } from 'src/cart-product/entities/cart-product.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { CreateOrderDto } from 'src/order/dtos/create-order.dto';
import { paymentType } from 'src/payment-status/enums/payment-type.enum';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { PaymentCreditCardEntity } from './entities/payment-credit-card.entity';
import { PaymentPixEntity } from './entities/payment-pix.entity';
import { PaymentEntity } from './entities/payment.entity';

@Injectable()
export class PaymentService {

    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>
    ){}
    
    
    generateFinalPrice(cart: CartEntity, products: ProductEntity[]){

        if ( !cart.cartProduct || cart.cartProduct.length === 0 ){
            return 0;
        }

        return cart.cartProduct?.map(
            (cartProduct: CartProductEntity) => {
                const product = products.find(
                    (product) => product.id === cartProduct.productId,
                );

                if (product){
                    return cartProduct.amount * product.price
                }
                return 0;
            }
        ).reduce((accumulator,currentValue) => accumulator + currentValue,0);
    } 

    async createPayment(createOrderDto: CreateOrderDto, products: ProductEntity[], cart: CartEntity ): Promise<PaymentEntity>{

        const finalPrice = this.generateFinalPrice(cart, products);
    

        if (createOrderDto.amountPayments){

            const paymentCreditCard = new PaymentCreditCardEntity(paymentType.Done, finalPrice, 0, finalPrice, createOrderDto );

            return this.paymentRepository.save(paymentCreditCard);

        } else if (createOrderDto.codePix && createOrderDto.datePayment){

            const paymentPix = new PaymentPixEntity(paymentType.Done, finalPrice, 0, finalPrice, createOrderDto );

            return this.paymentRepository.save(paymentPix);
        }

        throw new BadRequestException('Amount payments or code pix or date payment não encontrados');
    }
}
