import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class MoviesDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  releasedYear: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Max(10)
  rating: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
