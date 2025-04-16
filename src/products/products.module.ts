import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../brands/brand.entity';
import { ProductReview } from './product-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, ProductReview])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
