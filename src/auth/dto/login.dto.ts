import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  id: string;
  @ApiProperty({example:'zhangsan'})
  userName: string;
  @ApiProperty({example:'a123456'})
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  role: string;
}

export class WechatLoginDto {
  @ApiProperty({ description: '授权码' })
  @IsNotEmpty({ message: '请输入授权码' })
  code: string;
}
