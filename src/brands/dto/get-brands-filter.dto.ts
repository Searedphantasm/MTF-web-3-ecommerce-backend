import { IsOptional } from 'class-validator';

export class GetBrandsFilterDto {
  @IsOptional()
  search?: string;
}
