import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  name: string;
}
