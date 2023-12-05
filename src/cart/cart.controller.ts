import { Body, Controller, Delete, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CartEntity } from './entities/cart.entity';
import { InsertCartDto } from './dtos/insert-cart.dto';
import { CartService } from './cart.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { ReturnCartDto } from './dtos/return-cart.dto';
import { DeleteResult } from 'typeorm';

@Roles(UserType.User, UserType.Admin)
@Controller('cart')
export class CartController {

    constructor(
        private readonly cartService: CartService
    ){}

    @UsePipes(ValidationPipe)
    @Post()
    async insertCart(
        @Body() insertCart: InsertCartDto,
        @UserId() userId: number, // pega o UserId no Token 
    ): Promise<ReturnCartDto>{

        return new ReturnCartDto(await this.cartService.insertCart(insertCart, userId));
    }


    @Get()
    async findCartByUserId(
        @UserId() userId: number
    ): Promise<ReturnCartDto>{

        return new ReturnCartDto(await this.cartService.findCartByUserId(userId, true));
    }


    @Delete()
    async clearCart(
        @UserId() userId: number
    ): Promise<DeleteResult>{

        return this.cartService.clearCart(userId);
    }


}
