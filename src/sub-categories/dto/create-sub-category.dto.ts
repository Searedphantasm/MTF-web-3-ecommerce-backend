import { IsNotEmpty } from 'class-validator';

export class CreateSubCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  image_key: string;

  @IsNotEmpty()
  parent_category_id: number;
}
