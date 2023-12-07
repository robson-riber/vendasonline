import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { create } from 'domain';
import { CreateAddressDto } from 'src/address/dto/createAddress.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { DeleteResult } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { ReturnProduct } from './dtos/return-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {

    constructor(
        private readonly productService: ProductService
    ){}

    @Get()
    async findAll(): Promise<ReturnProduct[]>{
        
        return (await this.productService.findAll([], true)).map(
            (product) => new ReturnProduct(product)
        );
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createProduct(
        @Body() createProduct: CreateProductDto 
    ): Promise<ProductEntity>{

        return this.productService.createProduct(createProduct);
    } 

    @Roles(UserType.Admin)
    @Delete('/:productId')
    async deleteProduct(
        @Param('productId') productId: number
    ): Promise<DeleteResult>{

        return this.productService.deleteProduct(productId);
    } 


    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Put('/:productId')
    async updateProduct(
        @Body() updateProduct: UpdateProductDto,
        @Param('productId') productId: number
    ): Promise<ProductEntity>{

        return this.productService.updateProduct(updateProduct, productId);
    } 


}
