import { Module } from '@nestjs/common';
import { WechatLoginService } from './wechat-login.service';
import { WechatLoginController } from './wechat-login.controller';
import { UserService } from 'src/user/user.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from 'src/prisma.service';
import { HttpService } from '@nestjs/axios';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    JwtModule.register({
      secret: 'yi1147862235',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [WechatLoginController],
  providers: [WechatLoginService, UserService, AuthService, PrismaService],
  exports: [],
})
export class WechatLoginModule {}
