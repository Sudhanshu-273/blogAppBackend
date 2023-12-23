import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({
        example: "sudhanshu@gmail.com"
    })
    email: string

    @ApiProperty({
        example :"123456"
    })
    password: string
}