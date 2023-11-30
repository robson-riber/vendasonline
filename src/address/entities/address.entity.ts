import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'address'})

export class AddressEntity {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({name: 'user_id', nullable: true})
    userId: number;

    @Column({name: 'complement', nullable: true})
    complement: string;

    @Column({name: 'number' })
    numberAddress: number;

    @Column({name: 'cep'})
    cep: string;

    @Column({name: 'city_id', nullable: false})
    cityId: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;


}