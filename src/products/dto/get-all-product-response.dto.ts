import { Exclude, Expose, Type } from 'class-transformer';

// Brand DTO
@Exclude()
export class BrandDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

// SubCategory DTO
@Exclude()
export class SubCategoryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose()
  description: string;
}

// GetAllProductResponse DTO
@Exclude()
export class GetAllProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  slug: string;

  @Expose()
  price: number;

  @Expose()
  poster: string;

  @Expose()
  poster_key: string;

  @Expose()
  alt_text: string;

  @Expose()
  description: string;

  @Expose()
  product_stock: number;

  @Expose()
  product_discount_price: number;

  @Expose()
  rating: number;

  @Expose()
  contact: string;

  @Expose()
  created_at: string;

  @Expose()
  @Type(() => BrandDto)
  brand: BrandDto;

  @Expose()
  @Type(() => SubCategoryDto)
  sub_categories: SubCategoryDto[];
}
