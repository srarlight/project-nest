import {
  Controller,
  Get,
  Post,
  Body,

  Param,
  Headers,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Request,
  Header,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, WechatLoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from './local-auth.guard';
// import { Public } from './white-auth.guard';
@ApiTags('验证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)

  // @Public()
  @ApiOperation({summary:'账号/邮箱登陆'})
  @Post('/login')
  create(@Body() user: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  
}
