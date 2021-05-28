import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'
export class LoginDTO {
  @ApiProperty({
    type: String,
    description: 'Ex: xxx@gmail.com',
    default:''
  })
  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password more 4 characters',
    default:''
  })
  @IsString()
  @MinLength(4)
  password: string;
}
export class RegisterDTO extends LoginDTO {
  @ApiProperty({
    type: String,
    description: 'Username is a string',
    default:''
  })
  @IsString()
  @MinLength(4)
  username: string;
}
export class UserDTO {
  @ApiProperty({
    type: String,
    description: 'Ex: xxx@gmail.com',
    default:''
  })
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
  @ApiProperty({
    type: String,
    description: 'Ex: xxx@gmail.com',
    default:''
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password more 4 characters',
    default:''
  })
  @IsOptional()
  password: string;


  @ApiProperty({
    type: String,
    description: 'Username is a string',
    default:''
  })
  @IsOptional()
  username: string;
}
export interface AuthPayload {
  email: string;
}
