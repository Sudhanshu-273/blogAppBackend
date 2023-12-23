import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {

    @ApiProperty({
        example: "sudhanshu"
    })
    username: string

    @ApiProperty({
        example: "sudhanshu@gmail.com"
    })
    email: string

    @ApiProperty({
        example: "123456"
    })
    password: string
}