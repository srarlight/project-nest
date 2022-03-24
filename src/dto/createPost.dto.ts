import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PaginationRequestDto } from 'src/helper/pagination.helper';
export class createPostDto {
  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({ message: '文章标题必填' })
  readonly title: string;

  @ApiProperty({ description: '作者' })
  readonly author: string;

  @ApiPropertyOptional({ description: '内容' })
  @IsNotEmpty({ message: '缺少内容' })
  readonly content: string;

  @ApiPropertyOptional({ description: '文章封面' })
  readonly cover_url: string;

  @ApiPropertyOptional({ description: 'thumb_url' })
  readonly thumb_url: string;

  @ApiPropertyOptional({ description: 'tinyint' })
  readonly tinyint: number;
  @ApiProperty({ description: '文章类型' })
  readonly type: number;
}
export class findPostDto extends PaginationRequestDto{
  @ApiProperty({ description: '文章标题' })
  readonly title: string;

  @ApiProperty({ description: '作者' })
  readonly author: string;

  @ApiPropertyOptional({ description: '内容' })
  readonly content: string;

  @ApiPropertyOptional({ description: '文章封面' })
  readonly cover_url: string;

  @ApiPropertyOptional({ description: 'thumb_url' })
  readonly thumb_url: string;

  @ApiPropertyOptional({ description: 'tinyint' })
  readonly tinyint: number;
  @ApiProperty({ description: '文章类型' })
  readonly type: number;
}
