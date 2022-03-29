import { Controller, Get, Post, Body, Patch, Param, Delete ,Request, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags,ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/white-auth.guard';

@ApiTags('用户管理')
@ApiBearerAuth() // swagger文档设置token
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //注册
  @Public()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

@ApiOperation({summary:'获取用户信息'})
// @UseGuards(JwtAuthGuard)
 @Get()
 getUserInfo(@Request() req){
  return req.user
 }
}
