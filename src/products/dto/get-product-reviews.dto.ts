import {
  IsBoolean,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class GetProductReviewsDto {
  @IsOptional()
  @IsBoolean()
  accepted: boolean;

  @IsNotEmpty()
  @IsNumberString()
  page: string;

  @IsNotEmpty()
  @IsNumberString()
  limit: string;
}
