import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreatePostDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    image?: string;

    @ApiProperty()
    @IsString()
    author: string;
}
