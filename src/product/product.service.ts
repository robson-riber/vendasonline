import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/categoty/category.service';
import { DeleteResult, In, Repository } from 'typeorm';
import { CountProduct } from './dtos/count-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,

        @Inject(forwardRef(() => CategoryService))
        private readonly categoryService: CategoryService

    ){}

    async findAll(productId?: number[], isFindRelations?: boolean): Promise<ProductEntity[]>{

        let findOptions = {};

        if( productId && productId.length > 0){
            findOptions = {
                where: {
                    id: In(productId),
                }
            }
        }
        
        if (isFindRelations){
            findOptions = {
                ...findOptions,
                relations: {
                    category: true,
                }
            }
        }

        const products = await this.productRepository.find(findOptions);

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

    async findProductById(productId: number): Promise<ProductEntity>{

        const product = await this.productRepository.findOne({
            where:{
                id: productId,
            }
        });

        if(!product){
            throw new NotFoundException(`Produto id: ${productId} não encontrado!`);
        }

        return product;
    }


    async deleteProduct (productId: number): Promise<DeleteResult>{

        const product = await this.findProductById(productId);
        
        //return this.productRepository.delete({id: product.id});  
        return this.productRepository.delete(product);  
    }


    async updateProduct(updateProduct: UpdateProductDto, productId : number): Promise<ProductEntity>{

        const product = await this.findProductById(productId);

        return this.productRepository.save({
            ...product, // recebe o objeto
            ...updateProduct // altera os dados do objeto
        });
    }


    async countProductsByCategoryId(): Promise<CountProduct[]>{

        return this.productRepository.createQueryBuilder('product')
            .select('product.category_id, COUNT(*) as total')
            .groupBy('product.category_id')
            .getRawMany();
    }


    
}
