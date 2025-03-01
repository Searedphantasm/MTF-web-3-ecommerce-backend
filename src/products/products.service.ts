import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import {
  GetProductsFilterDto,
  orderByEnum,
} from './dto/get-products-filter.dto';
import { CreateProductDto } from './dto/create-product.dto';

import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseInterface } from '../response.interface';
import { ProductSpecification } from '../product_specification/product_specification.entity';
import { ProductImage } from '../product_image/product_image.entity';
import { SubCategory } from '../sub-categories/sub-category.entity';
import { Brand } from '../brands/brand.entity';
import { ProductColorsEntity } from './product-colors.entity';
import { ProductStatus } from './product-status.enum';
import { ProductReview } from './product-review.entity';
import { GetProductReviewsDto } from './dto/get-product-reviews.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductReview)
    private productReviewRepository: Repository<ProductReview>,
    @InjectRepository(ProductColorsEntity)
    private productColorRepository: Repository<ProductColorsEntity>,
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  // async getAllReviews(
  //   filterDto: GetProductReviewsDto,
  // ): Promise<ResponseInterface<ProductReview[]>> {
  //   const { accepted, page = '1', limit = '10' } = filterDto;
  //
  //   const parsedPage = parseInt(page, 10);
  //   const parsedLimit = parseInt(limit, 10);
  //
  //   const query = this.productReviewRepository
  //     .createQueryBuilder('productReview')
  //     .leftJoinAndSelect('productReview.product', 'product')
  //     .leftJoinAndSelect('productReview.customer', 'customer');
  //
  //   if (accepted) {
  //     query.andWhere('productReview.accepted = true');
  //   }
  //
  //   const [data, total] = await query
  //     .take(parsedLimit)
  //     .skip((parsedPage - 1) * parsedLimit)
  //     .getManyAndCount();
  //
  //   return {
  //     data,
  //     total,
  //     page: parsedPage,
  //     totalPages: Math.ceil(total / parsedLimit),
  //   };
  // }

  async getProducts(
    filterDto: GetProductsFilterDto,
  ): Promise<ResponseInterface<Product[]>> {
    const { search, brand, sub_category, page, limit, category, orderBy } =
      filterDto;
    const query = this.productRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.brand', 'brand')
      .leftJoinAndSelect('p.colors', 'colors')
      .leftJoinAndSelect('p.sub_categories', 'psc')
      .leftJoinAndSelect('psc.parent_category', 'ppc');

    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    if (search) {
      query.andWhere('p.slug LIKE :search', {
        search: `%${search}%`,
      });
    }

    if (brand) {
      const brandID = parseInt(brand, 10);
      if (isNaN(brandID)) {
        query.andWhere('brand.slug LIKE :brand', {
          brand: `%${brand}%`,
        });
      } else {
        query.andWhere('brand.id = :brandID', { brandID });
      }
    }

    if (category) {
      const categoryID = parseInt(category, 10);
      if (isNaN(categoryID)) {
        query.andWhere('ppc.slug LIKE :category', {
          category: `%${category}%`,
        });
      } else {
        query.andWhere('ppc.id = :categoryID', { categoryID });
      }
    }

    // Filter by sub_category (ID or slug)
    if (sub_category) {
      const subCategoryID = parseInt(sub_category, 10);
      if (isNaN(subCategoryID)) {
        query.andWhere('psc.slug LIKE :sub_category', {
          sub_category: `%${sub_category}%`,
        });
      } else {
        query.andWhere('psc.id = :subCategoryID', { subCategoryID });
      }
    }

    if (orderBy) {
      query.andWhere('p.status = :gS', { gS: 'AVAILABLE' });
      switch (orderBy) {
        case orderByEnum.CHEAP:
          query.orderBy('p.price', 'ASC');
          break;
        case orderByEnum.DISCOUNT:
          query.orderBy('p.product_discount_price', 'ASC');
          break;
        case orderByEnum.RECENT:
          query.orderBy('p.created_at', 'DESC');
          break;
      }
    } else {
      query.orderBy('p.product_stock', 'DESC');
    }

    const [data, total] = await query
      .take(parsedLimit)
      .skip((parsedPage - 1) * parsedLimit)
      .getManyAndCount();

    const result: ResponseInterface<Product[]> = {
      data,
      total,
      page: parsedPage,
      totalPages: Math.ceil(total / parsedLimit),
    };

    return result;
  }

  async updateProductStatus(status: ProductStatus, id: number) {
    const found = await this.productRepository.findOne({
      where: { id },
    });

    found.status = status;
    await this.productRepository.save(found);
  }

  async updateProductSubCategory(subCategoryIds: number[], id: number) {
    await this.productRepository.manager.transaction(
      async (transactionmanager) => {
        const product = await transactionmanager.findOne(Product, {
          where: {
            id: id,
          },
        });

        const subCategories: SubCategory[] = [];

        for (const subCategorId of subCategoryIds) {
          const found = await transactionmanager.findOne(SubCategory, {
            where: {
              id: subCategorId,
            },
          });

          subCategories.push(found);
        }

        product.sub_categories = subCategories;
        await transactionmanager.save(product);
      },
    );
  }

  async updateProductColors(
    productColors: ProductColorsEntity[],
    product_stock: number,
    productId: number,
  ) {
    const found = await this.productRepository.findOne({
      where: { id: productId },
    });

    const productColorsArr: ProductColorsEntity[] = [];
    for (const color of productColors) {
      productColorsArr.push(this.productColorRepository.create(color));
    }

    found.product_stock = product_stock;
    found.colors = productColorsArr;
    await this.productRepository.save(found);
  }

  async updateProductPrice(price: number, discount_price: number, id: number) {
    const found = await this.productRepository.findOne({
      where: { id },
    });

    found.price = price;
    found.product_discount_price = discount_price;
    await this.productRepository.save(found);
  }

  async getProductById(id: number): Promise<Product> {
    const found = await this.productRepository
      .createQueryBuilder('pr')
      .where('pr.id = :id', { id })
      .innerJoinAndSelect('pr.brand', 'br')
      .innerJoinAndSelect('pr.specifications', 'pr_specs')
      .leftJoinAndSelect('pr.colors', 'colors')
      .innerJoinAndSelect('pr.images', 'pr_images')
      .innerJoinAndSelect('pr.sub_categories', 'sub_category')
      .getOne();

    if (!found) {
      throw new NotFoundException('Product not found');
    }

    return found;
  }

  async getProductBySlug(slug: string): Promise<Product> {
    const found = await this.productRepository
      .createQueryBuilder('pr')
      .where('pr.slug LIKE :slug', { slug })
      .innerJoinAndSelect('pr.brand', 'br')
      .leftJoinAndSelect('pr.reviews', 'review')
      .leftJoinAndSelect('review.customer', 'customer')
      .leftJoinAndSelect('pr.colors', 'colors')
      .innerJoinAndSelect('pr.specifications', 'pr_specs')
      .innerJoinAndSelect('pr.images', 'pr_images')
      .innerJoinAndSelect('pr.sub_categories', 'sub_category')
      .getOne();

    if (!found) {
      throw new NotFoundException('Product not found');
    }

    return found;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const existing = await this.productRepository.findOne({
      where: { slug: createProductDto.slug },
    });

    if (existing) {
      throw new BadRequestException('Product already exists');
    }

    return await this.productRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const subCategoryExists = await transactionalEntityManager.exists(
          SubCategory,
          { where: { id: createProductDto.sub_category_id } },
        );

        if (!subCategoryExists) {
          throw new NotFoundException('Sub Category not found!');
        }

        const brandExists = await transactionalEntityManager.exists(Brand, {
          where: { id: createProductDto.brand_id },
        });

        if (!brandExists) {
          throw new NotFoundException('Brand not found!');
        }

        const product = transactionalEntityManager.create(Product, {
          ...createProductDto,
          brand: { id: createProductDto.brand_id },
          sub_categories: [{ id: createProductDto.sub_category_id }],
        });

        const productSpecs: ProductSpecification[] = [];

        if (createProductDto.specifications.length > 0) {
          for (const specification of createProductDto.specifications) {
            const spec = transactionalEntityManager.create(
              ProductSpecification,
              specification,
            );

            productSpecs.push(spec);
          }
        }

        const productImages: ProductImage[] = [];

        if (createProductDto.specifications.length > 0) {
          for (const image of createProductDto.images) {
            const img = transactionalEntityManager.create(ProductImage, image);

            productImages.push(img);
          }
        }

        const productColors: ProductColorsEntity[] = [];

        if (createProductDto.colors.length > 0) {
          for (const color of createProductDto.colors) {
            const col = transactionalEntityManager.create(
              ProductColorsEntity,
              color,
            );

            productColors.push(col);
          }
        }

        product.colors = productColors;
        product.images = productImages;
        product.specifications = productSpecs;

        return await transactionalEntityManager.save(product);
      },
    );
  }

  async deleteProduct(id: number): Promise<void> {
    const deleteResult = await this.productRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException('Product not found');
    }
  }

  // Updating Product -------------

  async updateProduct(
    updateProductDto: UpdateProductDto,
    id: number,
  ): Promise<Product> {
    let brand: Brand;
    if (updateProductDto.brand_id) {
      brand = await this.brandRepository.findOne({
        where: { id: updateProductDto.brand_id },
      });

      if (!brand) {
        throw new NotFoundException('Brand not found!');
      }
    }

    const found = await this.getProductById(id);

    const updatedProduct = {
      ...found,
      ...updateProductDto,
      brand,
    };

    return await this.productRepository.save(updatedProduct);
  }

  async updateProductImages(updatedProductImages: ProductImage[], id: number) {
    const product = await this.productRepository.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return await this.productRepository.manager.transaction(
      async (transactionManager) => {
        await transactionManager.delete(ProductImage, {
          product: { id: id },
        });

        product.images = updatedProductImages;

        return await transactionManager.save(Product, product);
      },
    );
  }

  async updateProductSpec(updatedSpecs: ProductSpecification[], id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return await this.productRepository.manager.transaction(
      async (transactionManager) => {
        await transactionManager.delete(ProductSpecification, {
          product: { id: id },
        });

        product.specifications = updatedSpecs;

        return await transactionManager.save(Product, product);
      },
    );
  }
}
