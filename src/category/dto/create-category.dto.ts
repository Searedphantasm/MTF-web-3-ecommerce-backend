import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    required: true,
    description: 'The name of the category',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    required: true,
    description: 'Unique slug for the category',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  slug: string;

  @ApiProperty({
    required: true,
    description: 'Description of the category',
    maxLength: 65000,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(65000)
  description: string;

  @ApiProperty({
    required: true,
    description: 'URL or path to the category image',
    maxLength: 500,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  image: string;

  @ApiProperty({
    required: true,
    description: 'Key for the category image',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  image_key: string;
}
