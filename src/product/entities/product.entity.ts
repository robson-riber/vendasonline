import { CartProductEntity } from "src/cart-product/entities/cart-product.entity";
import { CategoryEntity } from "src/categoty/entities/category.entity";
import { OrderProductEntity } from "src/order-product/entities/order-product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: 'product'})

export class ProductEntity{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'category_id', nullable: false})
    categoryId: number;

    @Column({name: 'price', type: 'decimal', nullable: false})
    price: number;

    @Column({name: 'image', nullable: false})
    image: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany( () => CartProductEntity, (cartProduct) => cartProduct.product )
    cartProduct?: CartProductEntity[];
    
    @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category.products)
    @JoinColumn({name: 'category_id', referencedColumnName: 'id'})
    category?: CategoryEntity;


    @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product )
    ordersProduct?: OrderProductEntity[];

}