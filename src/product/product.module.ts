import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryModule } from 'src/categoty/category.module';
import { CorreiosModule } from 'src/correios/correios.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), forwardRef(() => CategoryModule), CorreiosModule ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService]
})
export class ProductModule {}
