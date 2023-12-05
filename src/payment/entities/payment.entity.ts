import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from "typeorm";

@Entity({name: 'payment'})
@TableInheritance({column: {type: "varchar", name: 'type'}})
export abstract class PaymentEntity {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({name: 'status_id', nullable: false})
    statusId: number;

    @Column({name: 'price', nullable: false})
    price: number;

    @Column({name: 'discount', nullable: false})
    discount: number;

    @Column({name: 'final_price', nullable: false})
    finalPrice: number;

    @Column({name: 'type', nullable: false})
    type: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

 
}