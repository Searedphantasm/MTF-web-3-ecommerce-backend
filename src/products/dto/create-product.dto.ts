import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '../product-status.enum';
import { CreateProductImageDto } from '../../product_image/dto/create-product-image.dto';
import { CreateProductSpecificationDto } from '../../product_specification/dto/create-product.dto';
import { ProductColorsEntity } from '../product-colors.entity';

export class CreateProductDto {
  @ApiProperty({ required: true, description: 'The title of the product' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  title: string;

  @ApiProperty({ required: true, description: 'Unique slug for the product' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  slug: string;

  @ApiProperty({ required: true, description: 'Product description' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 65000)
  description: string;

  @ApiProperty({ required: true, minimum: 0, description: 'Product price' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    required: true,
    description: 'URL or path to the poster image',
  })
  @IsNotEmpty()
  @IsString()
  poster: string;

  @ApiProperty({ required: true, description: 'Key for the poster image' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  poster_key: string;

  @ApiProperty({
    required: true,
    description: 'Alternative text for the poster',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  alt_text: string;

  @ApiProperty({ required: true, minimum: 0, description: 'Stock quantity' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  product_stock: number;

  @ApiProperty({ required: true, minimum: 0, description: 'Sub-category ID' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  sub_category_id: number;

  @ApiProperty({ required: true, minimum: 0, description: 'Brand ID' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  brand_id: number;

  @ApiProperty({ required: true, description: 'Consumer guide' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 65000)
  consumer_guide: string;

  @ApiProperty({
    required: false,
    description: 'Contact information (optional)',
  })
  @IsOptional()
  @IsString()
  @Length(3, 11)
  contact: string;

  @ApiProperty({
    required: true,
    enum: ProductStatus,
    description: 'Product status',
  })
  @IsNotEmpty()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @ApiProperty({
    required: true,
    type: [CreateProductSpecificationDto],
    description: 'Product specifications',
  })
  @IsNotEmpty()
  @IsArray()
  specifications: CreateProductSpecificationDto[];

  @ApiProperty({
    required: true,
    type: [CreateProductImageDto],
    description: 'Product images',
  })
  @IsNotEmpty()
  @IsArray()
  images: CreateProductImageDto[];

  @ApiProperty({
    required: false,
    type: [ProductColorsEntity],
    description: 'Product colors (optional)',
  })
  @IsOptional()
  @IsArray()
  colors: ProductColorsEntity[];
}
