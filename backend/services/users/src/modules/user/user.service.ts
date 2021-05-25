import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
     @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  )    
  { }
  async find() {
    return this.userRepo.find()
  }
  async findByEmail(email: string): Promise<UserEntity>{
    return this.userRepo.findOne({where: {email}})
  }
  async updateUser(email: string,data): Promise<UserEntity>{
    await this.userRepo.update({ email }, data)
    return this.findByEmail(email)
  }
}