import { Module } from '@nestjs/common';
import { ProductImageService } from './product_image.service';
import { ProductImage } from './product_image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage])],
  providers: [ProductImageService],
  exports: [ProductImageService],
})
export class ProductImageModule {}
