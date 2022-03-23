import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class createPostDto {
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
