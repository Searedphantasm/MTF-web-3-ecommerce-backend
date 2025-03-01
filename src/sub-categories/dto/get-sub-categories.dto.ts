import { IsOptional, IsString } from 'class-validator';

export class GetSubCategoriesFilterDto {
  @IsOptional()
  @IsString()
  search: string;

  // Works for id and slug
  @IsOptional()
  @IsString()
  category: string;
}
