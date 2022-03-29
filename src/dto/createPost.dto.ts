import {
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PaginationRequestDto } from 'src/helper/pagination.helper';
enum PostStatus {
  draft = 'draft',
  Publish = 'publish',
}
export class createPostDto {
  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({ message: '文章标题必填' })
  readonly title: string;
  @ApiPropertyOptional({ description: '内容' })
  readonly content: string;

  @ApiPropertyOptional({ description: '文章封面' })
  readonly cover_url: string;

  @ApiPropertyOptional({ description: '阅读量' })
  readonly count: number;

  @ApiPropertyOptional({ description: '点赞量' })
  readonly likeCount: number;

  @ApiPropertyOptional({ description: '推荐显示' })
  readonly isRecommend: number;

  @ApiPropertyOptional({ description: '文章状态', example: 'publish' })
  readonly status: PostStatus;
  @ApiPropertyOptional({ description: '文章状态', example: 'publish' })
  readonly publishTime: string;
  @ApiProperty({ description: '文章分类' })
  readonly categories: any;
  @ApiProperty({ description: '文章标签' })
  readonly tag: number;
  @ApiProperty({ description: '摘要，自动生成' })
  readonly summary: string;
  @ApiProperty({ description: 'contentHtml' })
  readonly contentHtml: string;
  @ApiProperty({ description: 'author' })
  readonly author: any;
  @ApiProperty({ description: 'coverUrl' })
  readonly coverUrl: string;
}

export class findPostDto extends PaginationRequestDto {
  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({ message: '文章标题必填' })
  readonly title: string;
  @ApiPropertyOptional({ description: '内容' })
  readonly content: string;


  @ApiPropertyOptional({ description: '阅读量' })
  readonly count: number;

  @ApiPropertyOptional({ description: '点赞量' })
  readonly likeCount: number;

  @ApiPropertyOptional({ description: '推荐显示' })
  readonly isRecommend: number;
  @ApiPropertyOptional({ description: '推荐显示' })
  readonly categoryId: any;
  @ApiPropertyOptional({ description: '推荐显示' })
  readonly userId: string;
  @ApiPropertyOptional({ description: '文章状态', example: 'publish' })
  readonly status: PostStatus;
  @ApiPropertyOptional({ description: '文章发布时间', example: 'publish' })
  readonly publishTime: string;
  @ApiProperty({ description: '文章分类' })
  readonly categories: any;
  @ApiProperty({ description: '文章标签' })
  readonly tag: number;
  @ApiProperty({ description: '摘要，自动生成' })
  readonly summary: string;
  @ApiProperty({ description: 'contentHtml' })
  readonly contentHtml: string;
  @ApiProperty({ description: 'author' })
  readonly author: any;
  @ApiProperty({ description: 'coverUrl' })
  readonly coverUrl: string;
}
