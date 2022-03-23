import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { postEntity, postResult } from 'src/api/post.dto';
import { ApiTags ,ApiOperation} from '@nestjs/swagger';
import { createPostDto } from 'src/dto/createPost.dto';

@ApiTags("文章")
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  /**
   * 创建文章
   * @param post
   * @returns
   */
  @ApiOperation({summary:'创建文章'})
  @Post()
  create(@Body() post: createPostDto): Promise<postResult> {
    return this.postService.create(post);
  }
  /**
   * 获取所有文章
   */
   @ApiOperation({summary:'获取所有文章'})
  @Get()
  async findAll(@Query() query): Promise<postResult> {
    return this.postService.findAll(query);
  }

  /**
   * 获取指定文章
   * @param id
   */
   @ApiOperation({summary:'获取指定文章'})

  @Get(':id')
  async findById(@Param('id',new ParseIntPipe()) id:number) {
    return await this.postService.findById(id);
  }

   /**
     * 更新文章
     * @param id 
     * @param post 
     */
    @ApiOperation({summary:'更新文章'})
    @Put(":id")
    async update(@Param("id",new ParseIntPipe) id:number, @Body() post:postEntity){
        return await this.postService.updateById(id, post)
    }

}
