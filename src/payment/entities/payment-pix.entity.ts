import { CreateOrderDto } from "src/order/dtos/create-order.dto";
import { ChildEntity, Column } from "typeorm";
import { PaymentEntity } from "./payment.entity";

@ChildEntity()
export class PaymentPixEntity extends PaymentEntity {
    
    @Column({name: 'code', nullable: false})
    code: string;

    @Column({name: 'date_payment', nullable: false})
    datePayment: Date;

    constructor(
        statusId : number,
        price : number,
        discount: number,
        finalPrice: number,
        createOrderDto: CreateOrderDto,
    ){
        super(statusId, price, discount, finalPrice), // SUPER é usado porque extends PaymentsEntity
        this.code = createOrderDto?.codePix || '';
        this.datePayment = new Date(createOrderDto?.datePayment || '');
    }

 
}