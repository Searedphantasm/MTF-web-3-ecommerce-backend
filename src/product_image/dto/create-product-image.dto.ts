import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductImageDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  url_key: string;

  @IsNotEmpty()
  @IsString()
  alt_text: string;
}
