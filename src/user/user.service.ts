import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

import { hashSync } from 'bcryptjs';
import { DataExistException } from 'src/core/filter/DataExist-exception';

@Injectable()
export class UserService {
  constructor(private prismas: PrismaService) {}
  public userResponse = {
    id: true,
    userName: true,
    nickName: true,
    avatar: true,
    status: true,
    role: true,
    email: true,
    createdAt: true,
    updatedAt: true,
  }
  //用户注册
  async register(createUserDto: Prisma.UserCreateInput): Promise<any> {
    const { userName } = createUserDto;
    const existUser = await this.prismas.user.findFirst({
      where: { userName },
    });
    console.log(existUser, 'user');
    if (existUser) {
      throw new DataExistException('用户名已存在');
    }
    //加密密码
    const params = {
      ...createUserDto,
      password: hashSync(createUserDto.password),
    };
    return await this.prismas.user.create({
      data: params,
      select: this.userResponse,
    });
  }
  async registerByWechat(userInfo: any) {
    const { nickname, openid, headimgurl } = userInfo;
    return await this.prismas.user.create({
      data:{
        nickName:nickname,
        openid,
        avatar: headimgurl,
      }
    } as any);
  }
  findOne(id: string) {
    return this.prismas.user.findUnique({
      where: { id },
      select: this.userResponse
    });
  }async findByOpenid(openid: string) {
    return await this.prismas.user.findMany({ where: { openid } });
  }


}
