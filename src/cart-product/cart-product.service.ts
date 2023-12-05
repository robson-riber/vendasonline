import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertCartDto } from 'src/cart/dtos/insert-cart.dto';
import { UpdateCartDto } from 'src/cart/dtos/update-cart.dto';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { ProductService } from 'src/product/product.service';
import { DeleteResult, Repository } from 'typeorm';
import { CartProductEntity } from './entities/cart-product.entity';

@Injectable()
export class CartProductService {

    constructor(
        @InjectRepository(CartProductEntity)
        
        private readonly cartProductRepository: Repository<CartProductEntity>,
        private readonly productService: ProductService
    ){}

    async verifyProductInCart(productId: number, cartId: number): Promise<CartProductEntity>{
        const cartProduct = await this.cartProductRepository.findOne({
            where: {
                productId,
                cartId
            }
        });

        if(!cartProduct){
            throw new NotFoundException('Produto não encontrado no carrinho.')
        }

        return cartProduct;
    }


    async createProductInCart(insertCartDto: InsertCartDto, cartId: number){
       
        return this.cartProductRepository.save({
        amount: insertCartDto.amount,
        productId: insertCartDto.productId,
        cartId
       }); 
    }


    async insertProductInCart(insertCartDto: InsertCartDto, cart: CartEntity): Promise<CartProductEntity>{

        await this.productService.findProductById(insertCartDto.productId);

        const cartProduct = await this.verifyProductInCart(insertCartDto.productId, cart.id).catch(() => undefined);

        if(!cartProduct){

            return this.createProductInCart(insertCartDto, cart.id);
        }

        return this.cartProductRepository.save({
            ...cartProduct,
            amount: cartProduct.amount + insertCartDto.amount
        });
    }


    async updateProductInCart(updateCartDto: UpdateCartDto, cart: CartEntity): Promise<CartProductEntity>{

        await this.productService.findProductById(updateCartDto.productId);

        const cartProduct = await this.verifyProductInCart(updateCartDto.productId, cart.id);

        if(!cartProduct){

            return this.createProductInCart(updateCartDto, cart.id);
        }

        return this.cartProductRepository.save({
            ...cartProduct,
            amount: updateCartDto.amount,
        });
    }


    async deleteProductCart(productId: number, cartId: number): Promise<DeleteResult>{

        return this.cartProductRepository.delete({
            productId,
            cartId
        });
    }
}
