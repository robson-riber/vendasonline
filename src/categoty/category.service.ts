import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategory } from './dtos/create-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>
    ){}
    
    async findAllCategories(): Promise<CategoryEntity[]>{

        const categories = await this.categoryRepository.find();

        if (!categories || categories.length === 0){
            throw new NotFoundException('Categoria não encontrada.');
        }

        return categories;
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






}
