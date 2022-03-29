import { ConflictException, HttpException, HttpStatus } from "@nestjs/common";

export class DataExistException extends HttpException {
    constructor( public name:string = '数据已存在'){
        super({
            message:`${name}，请勿重复创建`
        },HttpStatus.BAD_REQUEST)
    }
}