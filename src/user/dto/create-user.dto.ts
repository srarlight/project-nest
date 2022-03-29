import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
enum userStatus {
    Active='active',
    Disabled='disabled'
  };
  enum Role {
    USER = 'user',
    ADMIN = 'admin'
  }
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'zhangsan' })
  userName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'zhangsan' })
  nickName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'a123456' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'https://xxx.png' })
  avatar: string;

  @IsString()
  @ApiProperty({ example: 'xsds' })
  openid: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'xxxx@qq.com' })
  email: string;

  @IsEnum(userStatus)
  status: userStatus

  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({
    example: 'user',
  })
  role;

}
