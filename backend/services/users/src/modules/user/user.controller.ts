import { updateUserDTO } from '../../models/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Body, Controller, Get, UseGuards, Put, ValidationPipe, Req, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from 'src/decorator/user.decorator';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import {Request} from "express";

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
  // async all(@Req() req: Request) {
  //   const builder = await this.userService.queryBuilder('users');  
  //       if (req.query.s) {
  //           builder.where("users.email LIKE :s OR users.username LIKE :s", {q: `%${req.query.q}%`})
  //       }
  //       const sort: any = req.query.sort;
  //       if (sort) {
  //           builder.orderBy('users.created', sort.toUpperCase());
  //       }
  //       const page: number = parseInt(req.query.page as any) || 1;
  //       const perPage = 9;
  //       const total = await builder.getCount();
  //       builder.offset((page - 1) * perPage).limit(perPage);
  //       return {
  //           data: await builder.getMany(),
  //           total,
  //           page,
  //           last_page: Math.ceil(total / perPage)
  //       };
  // }
  async all(@Query() query) {
    return this.userService.find(query)
    }
  @Put()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  update(@User() { email }: UserEntity, @Body(new ValidationPipe({transform: true, whitelist: true})) data: updateUserDTO) {
    return this.userService.updateUser(email, data)
  }

}
