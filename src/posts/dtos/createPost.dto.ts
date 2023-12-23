import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({
        example: "Nishant Fucking"
    })
    title: string

    @ApiProperty({
        example: "Sports"
    })
    category: string

    @ApiProperty({
        example: "2023-12-11"
    })
    date: Date

    @ApiProperty({
        example: "iufdh weofyg qwefhy wyui qewofig qwefdyu sdfiu ewqrfuyg eruoyfhg eruhfg erjhfg eukhrfufgruf"
    })
    description: string
}