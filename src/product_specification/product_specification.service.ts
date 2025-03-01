import { Injectable } from '@nestjs/common';
import { ProductSpecification } from './product_specification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductSpecificationDto } from './dto/create-product.dto';
import { Product } from '../products/product.entity';

@Injectable()
export class ProductSpecificationService {
  constructor(
    @InjectRepository(ProductSpecification)
    private productSpecificationRepository: Repository<ProductSpecification>,
  ) {}

  async createProductSpecification(
    createProductSpecificationDto: CreateProductSpecificationDto,
    productId: number,
  ): Promise<ProductSpecification> {
    const specification = this.productSpecificationRepository.create({
      ...createProductSpecificationDto,
      product: { id: productId },
    });

    return await this.productSpecificationRepository.save(specification);
  }

  createProductSpecificationInstance(
    createProductSpecificationDto: CreateProductSpecificationDto,
    productId: number,
  ) {
    const specification = this.productSpecificationRepository.create({
      ...createProductSpecificationDto,
      product: { id: productId },
    });

    return specification;
  }
}
