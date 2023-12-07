import { ReturnAddressDto } from "src/address/dto/returnAddress.dto";
import { OrderProductEntity } from "src/order-product/entities/order-product.entity";
import { ReturnPaymentDto } from "src/payment/dtos/return-payment.dto";
import { ReturnUserDto } from "src/user/dtos/returnUser.dto";
import { OrderEntity } from "../entities/order.entity";

export class ReturnOrderDto{

    id: number;
    date: string;
    user?: ReturnUserDto;
    address?: ReturnAddressDto;
    payment?: ReturnPaymentDto;
    ordersProduct?: OrderProductEntity;
  
    constructor(order: OrderEntity){

        this.id = order.id;
        this.date = order.date.toString();
        //this.user = order.user ? order.user : undefined;
        this.user = order.user ? new ReturnUserDto(order.user) : undefined;
        this.address = order.address ? new ReturnAddressDto(order.address) : undefined;
        this.payment = order.payment ? new ReturnPaymentDto(order.payment) : undefined;
        this.ordersProduct = order.ordersProduct;
    }
}