import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './product_image.entity';
import { Repository } from 'typeorm';
import { CreateProductImageDto } from './dto/create-product-image.dto';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
  ) {}

  async createProductImage(
    createProductImageDto: CreateProductImageDto,
    productId: number,
  ): Promise<ProductImage> {
    const productImage = this.productImageRepository.create({
      ...createProductImageDto,
      product: { id: productId },
    });

    return await this.productImageRepository.save(productImage);
  }

  createProductImageInctance(
    createProductImageDto: CreateProductImageDto,
    productId: number,
  ): ProductImage {
    const productImage = this.productImageRepository.create({
      ...createProductImageDto,
      product: { id: productId },
    });

    return productImage;
  }
}
