import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  AccessConfig,
  AccessTokenInfo,
  WechatError,
} from 'src/wechat-login/interface/login';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { WechatUserInfo } from './interface/login';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class WechatLoginService {
  constructor(
    private  httpService: HttpService,
    private  userService:UserService,
    private  authService:AuthService,
  ) {}
  public apiServer = 'https://api.weixin.qq.com';
  private accessTokenInfo: AccessTokenInfo;
  // code获取access_token
  async getAccessToken(code) {
    const { APPID, APPSECRET } = process.env;
    if (!APPSECRET) {
      throw new BadRequestException('[getAccessToken]必须有appSecret');
    }
    if (
      !this.accessTokenInfo ||
      (this.accessTokenInfo && this.isExpires(this.accessTokenInfo))
    ) {
      // 使用httpService请求accessToken数据
      const res: AxiosResponse<WechatError & AccessConfig, any> =
        await lastValueFrom(
          this.httpService.get(
            `${this.apiServer}/sns/oauth2/access_token?appid=${APPID}&secret=${APPSECRET}&code=${code}&grant_type=authorization_code`,
          ),
        );

      if (res.data.errcode) {
        throw new BadRequestException(
          `[getAccessToken] errcode:${res.data.errcode}, errmsg:${res.data.errmsg}`,
        );
      }
      this.accessTokenInfo = {
        accessToken: res.data.access_token, //接口调用凭证
        expiresIn: res.data.expires_in, //access_token 接口调用凭证超时时间，单位（秒）
        getTime: Date.now(),
        openid: res.data.openid, //授权用户唯一标识
      };
    }

    return this.accessTokenInfo.accessToken;
  }
  //判断token是否有效
  isExpires(access:AccessTokenInfo) {
    return Date.now() - access.getTime > access.expiresIn * 1000;
  }
  //微信登陆
  async loginWithWechat(code) {
    if (!code) {
      throw new BadRequestException('请输入微信授权码');
    }
    await this.getAccessToken(code);

    // 查找用户是否存在
    const user:any = await this.getUserByOpenid();
    if (!user) {
      // 获取微信用户信息，注册新用户
      const userInfo: WechatUserInfo = await this.getUserInfo();
      return this.userService.registerByWechat(userInfo);
    }
    return this.authService.login(user);
  }

  async getUserByOpenid() {
    return await this.userService.findByOpenid(this.accessTokenInfo.openid);
  }
  async getUserInfo() {
    const result: AxiosResponse<WechatError & WechatUserInfo> =
      await lastValueFrom(
        this.httpService.get(
          `${this.apiServer}/sns/userinfo?access_token=${this.accessTokenInfo.accessToken}&openid=${this.accessTokenInfo.openid}`,
        ),
      );
    if (result.data.errcode) {
      throw new BadRequestException(
        `[getUserInfo] errcode:${result.data.errcode}, errmsg:${result.data.errmsg}`,
      );
    }
    console.log('result', result.data);

    return result.data;
  }
}
