import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { postEntity, postResult } from 'src/api/post.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { createPostDto, findPostDto } from 'src/dto/createPost.dto';
import {
  PaginationHelper,
  PaginationResponseDto,
} from 'src/helper/pagination.helper';
// import { Public } from 'src/auth/white-auth.guard';
import { Roles, RolesGuard } from 'src/auth/role.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/white-auth.guard';

@ApiTags('文章')
@ApiBearerAuth() // swagger文档设置token
@Controller('post')
@Roles('admin')
@UseGuards(JwtAuthGuard,RolesGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}
  /**
   * 创建文章
   * @param post
   * @returns
   */
  @Public()
  @ApiOperation({ summary: '创建文章' })
  @Post()
  create(@Body() post: createPostDto): Promise<any> {
    return this.postService.create(post);
  }
  /**
   * 获取所有文章
   */
  @ApiOperation({ summary: '获取所有文章' })
  @Post('queryPostListVO')
  async findAll(
    @Body() data: findPostDto,
  ): Promise<PaginationResponseDto<postEntity>> {
    const countParams = {
      where: {
        title:data.title
      },
    };
    const total = await this.postService.getCount(countParams);
    const { pagination} = PaginationHelper.tranform(data,total);
    return this.postService.findAll(pagination, data);
  }

  /**
   * 获取指定文章
   * @param id
   */
  @ApiOperation({ summary: '获取指定文章' })
  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id: number) {
    return await this.postService.findById(id);
  }

  /**
   * 更新文章
   * @param id
   * @param post
   */
  @ApiOperation({ summary: '更新文章' })
  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() post: createPostDto,
  ) {
    return await this.postService.updateById(id, post);
  }
}
