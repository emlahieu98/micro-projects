import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
     @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  )    
  { }
  async find(query) {
    const {email, username, page , sort} = query
    const builder = this.userRepo.createQueryBuilder('users')
    if (email) {   
            await builder.where("users.email LIKE :email", {email: `%${email}%`})
    }
    if (username) {   
            await builder.where("users.username LIKE :username", {username: `%${username}%`})
    }
    if (sort) {
        builder.orderBy('users.created', sort.toUpperCase());
    }
        const perPage = 5;
        const total = await builder.getCount();
    builder.offset((page - 1) * perPage).limit(perPage);
        return {
            data: await builder.getMany(),
            total,
            page,
            last_page: Math.ceil(total / perPage)
        };
  }
  
  async findByEmail(email: string): Promise<UserEntity>{
    return this.userRepo.findOne({where: {email}})
  }
  async updateUser(email: string,data): Promise<UserEntity>{
    await this.userRepo.update({ email }, data)
    return this.findByEmail(email)
  }
}
