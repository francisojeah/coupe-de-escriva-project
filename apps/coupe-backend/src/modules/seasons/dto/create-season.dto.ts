import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateSeasonDto {
    @ApiProperty()
    @IsString()
    season: string;

    @ApiProperty()
    @IsBoolean()
    currentSeason: Boolean;
}