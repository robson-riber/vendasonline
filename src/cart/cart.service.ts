import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InsertCartDto } from './dtos/insert-cart.dto';
import { CartProductService } from 'src/cart-product/cart-product.service';

const LINES_AFFECTED = 1;

@Injectable()
export class CartService {

    constructor(
        @InjectRepository(CartEntity)
        private readonly cartRepository: Repository<CartEntity>,
        private readonly cartProductService: CartProductService
    ){}
    
    
    async clearCart(userId: number): Promise<DeleteResult>{

        const cart = await this.findCartByUserId(userId);

        await this.cartRepository.save({
            ...cart,
            active: false
        });

        return {
            raw: [],
            affected: LINES_AFFECTED
        };
    }

    
    async findCartByUserId(userId: number, isRelations?: boolean): Promise<CartEntity>{

        const relations = isRelations ? {
            cartProduct: {
                product: true,
            },
        } : undefined;


        const cart = await this.cartRepository.findOne({
            where: {
                userId,
                active: true
            },
            relations,
        })

        if(!cart){
            throw new NotFoundException('Carrinho não encontrado')
        }

        return cart;
    }


    async createCart(userId: number): Promise<CartEntity>{

        return this.cartRepository.save({
            active: true,
            userId,
        })
    }


    async insertCart(insertCartDto: InsertCartDto, userId: number): Promise<CartEntity>{

        const cart = await this.findCartByUserId(userId).catch(
            async() => {
                return this.createCart(userId);
            });
        
        await this.cartProductService.insertProductInCart(insertCartDto, cart);

       // return this.findCartByUserId(userId, true);
       
       return cart;
    } 

    

}



