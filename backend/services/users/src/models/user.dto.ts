import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class LoginDTO {
  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}
export class RegisterDTO extends LoginDTO {
  @IsString()
  @MinLength(4)
  username: string;
}
export class UserDTO {
  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsString()
  @MinLength(4)
  username: string;
}
export class updateUserDTO {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  password: string;

  @IsOptional()
  username: string;
}
export interface AuthPayload {
  email: string;
}
