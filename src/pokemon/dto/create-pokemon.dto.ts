import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @Length(1)
  name: string;

  @IsNumber()
  @Min(1)
  no: number;
}
