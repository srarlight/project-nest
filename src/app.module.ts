import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from '@nestjs/config';
import { WechatLoginModule } from './wechat-login/wechat-login.module';

@Module({
  imports: [PostModule,WechatLoginModule, UserModule, AuthModule, ],
  controllers: [AppController],
  providers: [AppService,ConfigService],
})
export class AppModule {}
