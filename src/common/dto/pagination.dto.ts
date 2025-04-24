import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  limit: Number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  skip: Number;
  // page: Number,
}
