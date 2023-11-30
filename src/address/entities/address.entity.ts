/*
    https://orkhan.gitbook.io/typeorm/docs/many-to-one-one-to-many-relations
*/

import { CityEntity } from "src/city/entities/city.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @ManyToOne(() => UserEntity, (user) => user.addresses)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
    user?: UserEntity; 


    @ManyToOne(() => CityEntity, (city) => city.addresses)
    @JoinColumn({ name: 'city_id', referencedColumnName: 'id'})
    city?: CityEntity; 

}