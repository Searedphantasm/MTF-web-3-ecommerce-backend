import { IsNumberString, IsOptional } from 'class-validator';

export class GetBrandsFilterDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  @IsNumberString()
  page: string;

  @IsOptional()
  @IsNumberString()
  limit: string;
}
