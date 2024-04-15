// standings.dto.ts
import { IsString, IsNotEmpty, IsObject, IsArray, IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FootballStandingMetric, BasketballStandingMetric, VolleyballStandingMetric } from '../interfaces/standing.interfaces';


export class StandingDto {
    @ApiProperty()
    @IsString()
    team: string;

    @ApiProperty()
    season: string;

    @ApiProperty()
    @IsNumber()
    position: number;

    @ApiProperty({ type: 'array', items: { type: 'object' } })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    metrics: (
        | { metric: FootballStandingMetric; value: number }
        | { metric: BasketballStandingMetric; value: number }
        | { metric: VolleyballStandingMetric; value: number }
    )[];

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    prevPosition?: number;
}