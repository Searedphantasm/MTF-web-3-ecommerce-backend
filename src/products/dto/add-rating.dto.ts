import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class AddRatingDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  rate: number;

  @IsOptional()
  @IsString()
  @Length(3, 60000)
  review: string;
}
