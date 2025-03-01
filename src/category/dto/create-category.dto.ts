import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  slug: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(65000)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  image: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  image_key: string;
}
