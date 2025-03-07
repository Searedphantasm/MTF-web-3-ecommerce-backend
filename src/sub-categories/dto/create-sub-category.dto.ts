import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubCategoryDto {
  @ApiProperty({ required: true, description: 'The name of the subcategory' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    description: 'Unique slug for the subcategory',
  })
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    required: true,
    description: 'Description of the subcategory',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    required: true,
    description: 'URL or path to the subcategory image',
  })
  @IsNotEmpty()
  image: string;

  @ApiProperty({ required: true, description: 'Key for the subcategory image' })
  @IsNotEmpty()
  image_key: string;

  @ApiProperty({ required: true, description: 'ID of the parent category' })
  @IsNotEmpty()
  parent_category_id: number;
}
