import { compareSync } from 'bcryptjs';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { PrismaService } from 'src/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class LocalStorage extends PassportStrategy(Strategy) {
  constructor(private prismas: PrismaService) {
    super({
      usernameField: "userName",
      passwordField: 'password',
    } as IStrategyOptions);
  }
  async validate(userName: string, password: string) {
      console.log(userName,password);
      
      const user = await this.prismas.user.findFirst({
            where:{
              OR:[
                {userName},{
                  email:userName
                }
              ]
            },
      })
      console.log(user,'user');
      
      if(!user) throw new BadRequestException('用户名不正确')
      if(!compareSync(password,user.password)){
        throw new BadRequestException('密码错误')
      }
      return user
  }
  
}
