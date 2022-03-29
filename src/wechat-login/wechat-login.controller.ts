import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Headers,
  Res,
} from '@nestjs/common';
import { WechatLoginService } from './wechat-login.service';
import { CreateWechatLoginDto } from './dto/create-wechat-login.dto';
import { UpdateWechatLoginDto } from './dto/update-wechat-login.dto';
import { ApiOperation, ApiBody } from '@nestjs/swagger';
import urlencode from 'urlencode';
// import { Public } from 'src/auth/white-auth.guard';
import { WechatLoginDto } from 'src/auth/dto/login.dto';

@Controller('wechat-login')
export class WechatLoginController {
  constructor(
    private readonly wechatLoginService: WechatLoginService,
  ) {}

  // @Public()
  @ApiOperation({ summary: '获取微信登陆二维码' })
  @Get('wechatLogin')
  async wechatLogin(@Headers() header, @Res() res) {
    console.log(process.env);

    const APPID = process.env.AppID;
    const redirectUri = urlencode('https://www.fanpi.cn');
    res.redirect(
      `https://open.weixin.qq.com/connect/qrconnect?appid=${APPID}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect`,
    );
  }

  @ApiOperation({ summary: '微信登录' })
  @ApiBody({ type: WechatLoginDto, required: true })
  @Post('wechat')
  async loginWithWechat(@Body('code') code: string) {
    this.wechatLoginService.loginWithWechat(code);
  }
}
