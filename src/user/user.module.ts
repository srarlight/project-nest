import { Module } from '@nestjs/common';
import { UserService } from './user.service';

import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
  controllers: [UserController],
 // {
    
//     provide: APP_GUARD,
//     useClass: JwtAuthGuard,
 
// }
  providers: [UserService,PrismaService,]
})
export class UserModule {}
