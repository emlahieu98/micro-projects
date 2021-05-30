import { updateUserDTO } from '../../models/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Body, Controller, Get, UseGuards, Put, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from 'src/decorator/user.decorator';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';



@Controller('users')
@ApiBearerAuth('access-token')
export class UserController {

  constructor(
    private userService: UserService
  ) { }


  @Get()
  @Roles('admin')
  
  @UseGuards(AuthGuard(), RolesGuard)
  
  
  //@ApiUnauthorizedResponse()
  all() {
    return this.userService.find()
  }

  @Put()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  update(@User() { email }: UserEntity, @Body(new ValidationPipe({transform: true, whitelist: true})) data: updateUserDTO) {
    return this.userService.updateUser(email, data)
  }

}
