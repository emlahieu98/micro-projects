import { updateUserDTO } from '../../models/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Body, Controller, Get, UseGuards, Put, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from 'src/decorator/user.decorator';


@Controller('profile')
export class ProfileController {
  constructor(private userService: UserService) {
    
  }

  @Get()
  @UseGuards(AuthGuard())
  findCurrentUser(@User() { email }: UserEntity) {
    return this.userService.findByEmail(email)
  }

  @Put()
  @UseGuards(AuthGuard())
  update(@User() { email }: UserEntity, @Body(new ValidationPipe({transform: true, whitelist: true})) data: updateUserDTO) {
    return this.userService.updateUser(email, data)
  }

}
