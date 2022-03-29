import { PartialType } from '@nestjs/swagger';
import { CreateWechatLoginDto } from './create-wechat-login.dto';

export class UpdateWechatLoginDto extends PartialType(CreateWechatLoginDto) {}
