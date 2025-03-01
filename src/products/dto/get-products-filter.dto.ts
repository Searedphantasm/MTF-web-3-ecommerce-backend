import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum orderByEnum {
  RECENT = 'RECENT',
  CHEAP = 'CHEAP',
  ALL = 'ALL',
  AVAILABLE = 'AVAILABLE',
  DISCOUNT = 'DISCOUNT',
}

export class GetProductsFilterDto {
  @ApiProperty({
    required: false,
    description: 'Search by product slug',
  })
  @IsOptional()
  @IsString()
  search?: string;

  // For brand-id and brand-slug
  @ApiProperty({
    description: 'Search by brand slug, and brand id',
    required: false,
  })
  @IsOptional()
  @IsString()
  brand?: string;

  // For sub-category-id and sub-category-slug
  @ApiProperty({
    description: 'sub-category-id and sub-category-slug',
    required: false,
  })
  @IsOptional()
  @IsString()
  sub_category?: string;

  // For sub-category-id and sub-category-slug
  @ApiProperty({
    description: 'sub-category-id and sub-category-slug',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsEnum(orderByEnum)
  orderBy: orderByEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  page: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  limit: string;
}
