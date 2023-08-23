import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  body: string;

  userId: string;
  categories: string[];
}
