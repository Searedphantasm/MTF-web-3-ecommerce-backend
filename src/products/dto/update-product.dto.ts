import { IsOptional, IsNumber, IsString, Length, Min } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @Length(3, 255)
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  poster: string;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  poster_key: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  product_stock: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  brand_id: number;

  @IsOptional()
  @IsString()
  @Length(3, 65000)
  consumer_guide: string;

  @IsOptional()
  @IsString()
  @Length(3, 11)
  contact: string;
}
