import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  HttpException,
} from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.PostCreateInput): Promise<any> {
    const { title } = data;
    if (!title) {
      throw new HttpException('缺少标题', 401);
    }
    const doc = await this.prisma.post.findMany({ where: { title } });
    console.log(doc, 'doc');
    if (doc.length > 0) {
      throw new HttpException('文章已存在', 401);
    }
    return await this.prisma.post.create({
      data,
    });
  }
  async findAll(query: Prisma.PostCreateInput): Promise<any> {
    return await this.prisma.post.findMany({});
  }
  async findById(id) {
    return await this.prisma.post.findUnique({
      where: { id },
    });
  }

  async updateById(id:number, data: Prisma.PostCreateInput) {
    const existPost = await this.prisma.post.findUnique({where:{id}});
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    return await this.prisma.post.update({
      where: {
        id,
      },
      data,
    });
  }
}
