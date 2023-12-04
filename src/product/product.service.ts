import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDto } from 'src/address/dto/createAddress.dto';
import { CategoryService } from 'src/categoty/category.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        private readonly categoryService: CategoryService
    ){}

    async findAll(): Promise<ProductEntity[]>{

        const products = await this.productRepository.find();

        if (!products || products.length === 0 ){
            throw new NotFoundException('Nenhum produto encontrado.');
        }

        return products;
    }

    async createProduct(createProduct: CreateProductDto): Promise<ProductEntity>{

        await this.categoryService.findCategoryById(createProduct.categoryId);

        return this.productRepository.save({
            ...createProduct
        })
        

    }

    
}
