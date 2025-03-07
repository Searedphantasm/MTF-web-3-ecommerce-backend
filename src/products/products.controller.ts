import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseInterface } from '../response.interface';
import { ProductImage } from '../product_image/product_image.entity';
import { ProductSpecification } from '../product_specification/product_specification.entity';
import { ProductStatus } from './product-status.enum';
import { ProductColorsEntity } from './product-colors.entity';
import { GetAllProductResponseDto } from './dto/get-all-product-response.dto';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query() filterDto: GetProductsFilterDto,
  ): Promise<ResponseInterface<GetAllProductResponseDto[]>> {
    return this.productsService.getProducts(filterDto);
  }

  // @Get('/reviews')
  // getReviews(
  //   @Query() filterDto: GetProductReviewsDto,
  // ): Promise<ResponseInterface<ProductReview[]>> {
  //   return this.productsService.getAllReviews(filterDto);
  // }

  @Get('/:id')
  getProduct(@Param('id') id: string): Promise<Product> {
    const parsedID = parseInt(id);
    if (isNaN(parsedID)) {
      return this.productsService.getProductBySlug(id);
    }
    return this.productsService.getProductById(parsedID);
  }

  @Post()
  createProduct(@Body() createProduct: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProduct);
  }

  @Put('/:id')
  updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Product> {
    return this.productsService.updateProduct(updateProductDto, id);
  }

  @Patch('/:id/images')
  updateProductImages(
    @Body('images') productImages: ProductImage[],
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Product> {
    return this.productsService.updateProductImages(productImages, id);
  }

  @Patch('/:id/specs')
  updateProductSpec(
    @Body('specs') productSpecifications: ProductSpecification[],
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Product> {
    return this.productsService.updateProductSpec(productSpecifications, id);
  }

  // @Patch('/:id/stock')
  // updateProductStock(
  //   @Body('specs') productSpecifications: ProductSpecification[],
  //   @Param('id', ParseIntPipe) id: number,
  // ): Promise<Product> {
  //   return this.productsService.updateProductSpec(productSpecifications, id);
  // }

  @Patch('/:id/colors-stock')
  updateProductColors(
    @Body('colors') productColors: ProductColorsEntity[],
    @Body('product_stock') product_stock: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.productsService.updateProductColors(
      productColors,
      product_stock,
      id,
    );
  }

  @Patch('/:id/price')
  updateProductPrice(
    @Body('price') price: number,
    @Body('discount_price') discount_price: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.productsService.updateProductPrice(price, discount_price, id);
  }

  @Patch('/:id/status')
  updateProductStatus(
    @Body('status') productStatus: ProductStatus,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.productsService.updateProductStatus(productStatus, id);
  }

  @Patch('/:id/add-subcategories')
  updateProductSubCategories(
    @Body('sub_category_ids') subCategoryIds: number[],
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.productsService.updateProductSubCategory(subCategoryIds, id);
  }

  @Delete('/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.deleteProduct(id);
  }
}
