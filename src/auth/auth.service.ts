import {  Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class AuthService {
  constructor(
    private prisma:PrismaService,
    private jwtService:JwtService,
    private userService:UserService,
    ){}

  //账号登陆
  async login(user:Prisma.UserCreateInput) {
    console.log('id',user);
    const token = this.jwtService.sign({
      id: user.id,
      username: user.userName,
      role: user.role,
    })
    return {token}
  }
  //获取用户信息
  async getUser(user:Prisma.UserCreateInput){
    return await this.userService.findOne(user.id)
  }
 

}
