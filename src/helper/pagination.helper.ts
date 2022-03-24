import { IsNotEmpty, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
export class PaginationHelper {
    static tranform({current,pageSize,...params}:PaginationRequestDto,totalRecords:number){
        const skip = (current- 1) * pageSize;
        const take = pageSize;
        const totalPages = Math.ceil(totalRecords / take);
        return {
            pagination:{
                skip,
                take,
                totalPages,
                pageSize,
                current
            },
            params
        }
    }
}


export class PaginationRequestDto {
  @Type(() => Number)
  @IsPositive({ message: 'current 必须为正数' })
  current: number;

  @Type(() => Number)
  @IsPositive({ message: 'pageSize必须为正数' })
  pageSize: number;
}
export class PaginationResponseDto<T> {
    current: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    hasNext: boolean;
    results: T;
  }

export interface PaginationEntity {
    skip: number;
    take: number;
    current: number;
    pageSize: number;
    totalPages:number
}
