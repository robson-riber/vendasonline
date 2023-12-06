import { CreateOrderDto } from "src/order/dtos/create-order.dto";
import { ChildEntity, Column } from "typeorm";
import { PaymentEntity } from "./payment.entity";

@ChildEntity()
export class PaymentCreditCardEntity extends PaymentEntity {
    
    @Column({name: 'amount_payments', nullable: false})
    amountPayments: number;

    constructor(
        statusId : number,
        price : number,
        discount: number,
        finalPrice: number,
        createOrderDto: CreateOrderDto,
    ){
        super(statusId, price, discount, finalPrice), // SUPER é usado porque extends PaymentsEntity
        this.amountPayments = createOrderDto?.amountPayments || 0;
    }

 
}