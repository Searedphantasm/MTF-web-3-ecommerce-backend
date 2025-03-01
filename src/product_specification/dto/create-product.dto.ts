import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductSpecificationDto {
  @IsNotEmpty()
  @IsString()
  spec_title: string;

  @IsNotEmpty()
  @IsString()
  spec_description: string;
}
