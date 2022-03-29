import { SetMetadata } from '@nestjs/common';
//全局设置权限校验
export const IS_PUBLIC_KEY = 'isPublic';
//装饰器 不需要权限校验
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);