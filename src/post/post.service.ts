import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  HttpException,
} from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import { skip, take } from 'rxjs';
import {
  PaginationEntity,
  PaginationHelper,
} from 'src/helper/pagination.helper';

import { PrismaService } from '../prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.PostCreateInput): Promise<any> {
    const { title } = data;
    const doc = await this.prisma.post.findMany({ where: { title } });
    if (doc.length > 0) {
      throw new HttpException('文章已存在', 401);
    }
    return await this.prisma.post.create({
      data,
    });
  }
  async getCount(data:any){
    return await this.prisma.post.count(data)
  } 
  async findAll(
    pagination: PaginationEntity,
    data: Prisma.PostCreateManyInput
  ): Promise<any> {
    const {pageSize,current,skip,take} = pagination
    const results = await this.prisma.post.findMany({
      skip,take,
      where:{
        title:data.title
      }
    });
    return {
        pageSize,
        current,
        list: results,
        totalPages:pagination.totalPages
    };
  }
  async findById(id:number) {
    return await this.prisma.post.findUnique({
      where: { id },
    });
  }

  async updateById(id: number, data: Prisma.PostCreateInput) {
    const existPost = await this.prisma.post.findUnique({ where: { id } });
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
