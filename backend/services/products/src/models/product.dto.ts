import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class createProductDTO {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  description: string | null;

}
