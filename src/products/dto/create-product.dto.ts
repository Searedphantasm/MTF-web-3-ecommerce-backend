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
import { ProductStatus } from '../product-status.enum';
import { CreateProductImageDto } from '../../product_image/dto/create-product-image.dto';
import { CreateProductSpecificationDto } from '../../product_specification/dto/create-product.dto';
import { ProductColorsEntity } from '../product-colors.entity';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  slug: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 65000)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsString()
  poster: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  poster_key: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  alt_text: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  product_stock: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  sub_category_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  brand_id: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 65000)
  consumer_guide: string;

  @IsOptional()
  @IsString()
  @Length(3, 11)
  contact: string;

  @IsNotEmpty()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsNotEmpty()
  @IsArray()
  specifications: CreateProductSpecificationDto[];

  @IsNotEmpty()
  @IsArray()
  images: CreateProductImageDto[];

  @IsOptional()
  @IsArray()
  colors: ProductColorsEntity[];
}
