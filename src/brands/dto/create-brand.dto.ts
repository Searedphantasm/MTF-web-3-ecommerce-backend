import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({ required: true, description: 'The name of the brand' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true, description: 'Unique slug for the brand' })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({ required: true, description: 'Description of the brand' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ required: true, description: 'URL or path to the brand logo' })
  @IsNotEmpty()
  @IsString()
  logo: string;

  @ApiProperty({ required: true, description: 'Key for the brand logo' })
  @IsNotEmpty()
  @IsString()
  logo_key: string;

  @ApiProperty({
    required: true,
    description: 'Country of origin for the brand',
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    required: true,
    description: 'Official website URL of the brand',
  })
  @IsNotEmpty()
  @IsString()
  website_url: string;
}
