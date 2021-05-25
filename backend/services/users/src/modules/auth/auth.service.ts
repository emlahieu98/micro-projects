import { Injectable, InternalServerErrorException, UnauthorizedException,ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { UserEntity } from 'src/entities/user.entity';
import { LoginDTO, RegisterDTO } from 'src/models/user.dto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
     private jwtService: JwtService
  ){}

  async register(credentials: RegisterDTO) {
   try {
     const user = await this.userRepo.create(credentials);
     await user.save();
     return user;
   } catch (error) {
     if (error.code === 'ER_DUP_ENTRY') {
       throw new ConflictException('Email has already been token')
     }   
     throw new InternalServerErrorException()
   }
  }

  async login({email, password}: LoginDTO) {
    const user = await this.userRepo.findOne({ where: { email } })
    if (!user) {
          throw new UnauthorizedException('Not found user');
        }
    const isValid = await user.comparePassword(password);
    if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
    const payload = { email: user.email,role: user.role, sub: user.id };
      const token = this.jwtService.sign(payload);
      return { user: { ...user.toJSON(), token } };
  }
}
