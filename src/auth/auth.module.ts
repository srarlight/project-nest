import { forwardRef, Module } from '@nestjs/common';

import { ConfigService, ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStorage } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { WechatLoginModule } from 'src/wechat-login/wechat-login.module';

//从环境变量中取SECRET
const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get('SECRET', 'yi1147862235'),
      signOptions: { expiresIn: '1h' },
    };
  },
});
@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('SECRET'),
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
    WechatLoginModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStorage,
    JwtStrategy,
    PrismaService,
    UserService,
    ConfigService,
  ],
  exports: [ConfigService],
})
export class AuthModule {}
