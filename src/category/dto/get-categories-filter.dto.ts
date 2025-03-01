import { IsOptional, IsString, MaxLength } from 'class-validator';

export class GetCategoriesFilterDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  search?: string;
}
