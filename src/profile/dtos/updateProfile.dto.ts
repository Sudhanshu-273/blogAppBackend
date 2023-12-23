import {ApiProperty} from "@nestjs/swagger";

export class UpdateProfileDto {
    @ApiProperty({
        example: "Aditya"
    })
    name: string

    @ApiProperty({
        example: "Web Developer"
    })
    designation: string

    @ApiProperty({
        example: "image_url"
    })
    image: string
}