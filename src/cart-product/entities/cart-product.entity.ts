import { CartEntity } from "src/cart/entities/cart.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class CartProductEntity{

    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({name: 'cart_id', nullable: false})
    cartId: number;

    @Column({name: 'product_id', nullable: false})
    productId: number;

    @Column({name: 'amount', nullable: false})
    amount: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(
        () => ProductEntity,
        (productEntity: ProductEntity) => productEntity.cartProduct
    )
    @JoinColumn({name: 'product_id', referencedColumnName: 'id'})
    product?: ProductEntity;


    @ManyToOne(
        () => CartEntity,
        (cartEntity: CartEntity) => cartEntity.cartProduct
    )
    @JoinColumn({name: 'cart_id', referencedColumnName: 'id'})
    cart?: CartEntity;


}