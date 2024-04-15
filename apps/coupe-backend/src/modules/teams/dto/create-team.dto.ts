import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Division, Sports } from '../interfaces/team.interfaces';

export class CreateTeamsDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    sport: Sports;

    @ApiProperty()
    @IsString()
    division: Division;
}
