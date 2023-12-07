import { forwardRef, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CategoryController } from './category.controller';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [ TypeOrmModule.forFeature([CategoryEntity]), forwardRef(() => ProductModule) ],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService]
})
export class CategoryModule {}
