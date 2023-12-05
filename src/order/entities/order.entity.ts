import { AddressEntity } from "src/address/entities/address.entity";
import { StateEntity } from "src/state/entities/state.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'orders'})

export class OrderEntity {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({name: 'user_id', nullable: false})
    userId: number;

    @Column({name: 'address_id', nullable: false})
    addresId: number;

    @Column({name: 'date', nullable: false})
    date: Date;

    @Column({name: 'payment_id', nullable: false})
    paymentId: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

}