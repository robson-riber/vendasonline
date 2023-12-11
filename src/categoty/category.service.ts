import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { count } from 'console';
import { CountProduct } from 'src/product/dtos/count-product.dto';
import { ProductService } from 'src/product/product.service';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCategory } from './dtos/create-category.dto';
import { ReturnCategory } from './dtos/return-category.dto';
import { UpdateCategory } from './dtos/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,

        @Inject(forwardRef(() => ProductService))
        private readonly productService: ProductService
    ){}

    findAmountCategoryInProduct(category: CategoryEntity, countList: CountProduct[]): number{
        
        const count = countList.find((itemCount) => itemCount.category_id === category.id);

        if (count) {
            return count.total;
        }

        return 0;
    }
    
    async findAllCategories(): Promise<ReturnCategory[]>{

        const categories = await this.categoryRepository.find();

        const count = await this.productService.countProductsByCategoryId();

        console.log(count);        
        
        if (!categories || categories.length === 0){
            throw new NotFoundException('Categoria não encontrada.');
        }

        return categories.map((category) => new ReturnCategory(category, this.findAmountCategoryInProduct(category, count) ));
    }


    async findCategoryById(categoryId: number, isRelations?: boolean): Promise<CategoryEntity>{

        const relations = isRelations 
        ? { 
            products: true,
        } 
        : undefined;

        const category = await this.categoryRepository.findOne({
            where: {
                id: categoryId,
            },
            relations,
        })

        if (!category){
            throw new NotFoundException("Categoria não encontrada!")
        }

        return category;
    }


    async findCategoryByName(name: string): Promise<CategoryEntity>{

        const category = await this.categoryRepository.findOne({
            where: {
                name,
            }
        })

        if(!category){
            throw new NotFoundException(`Categorria: ${category} não encontrada.`);
        }

        return category;
    }


    async createCategory(createCategory: CreateCategory): Promise<CategoryEntity>{

        const category = await this.findCategoryByName(createCategory.name).catch(
            () => undefined
        );
        
        if (category){
            throw new BadRequestException(`Categoria name: ${createCategory.name} já existe.`);
        }

        return this.categoryRepository.save(createCategory);
    }


    async deleteCategory(categoryId: number): Promise<DeleteResult>{

        const category = await this.findCategoryById(categoryId, true);

        console.log(category.products.length > 0);

        if ( category.products?.length > 0){
            throw new BadRequestException('Categoria não pode ser deletado por conter produtos relacionados.')
        }

        return this.categoryRepository.delete({id: categoryId});
    }


    async editCategory(categoryId: number, updateCategory: UpdateCategory): Promise<CategoryEntity>{

        const category = await this.findCategoryById(categoryId);

        return this.categoryRepository.save({
            ...category,
            ...updateCategory
        })

    }


}
