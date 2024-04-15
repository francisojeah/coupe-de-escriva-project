import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  BasketballPosition,
  FootballPosition,
  PlayerRole,
  VolleyballPosition,
} from '../interfaces/player.interfaces';
import { Types } from 'mongoose';

export class PlayerDto {

  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  playerNumber: number;

  @ApiProperty()
  season: any;

  @ApiProperty()
  @IsString()
  position: FootballPosition | BasketballPosition | VolleyballPosition;

  @ApiProperty({ enum: PlayerRole })
  @IsEnum(PlayerRole)
  playerRole: PlayerRole;

  @ApiProperty()
  team: any;

  @ApiProperty()
  @IsOptional()
  @IsString()
  profileImage?: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  stats?: {
    goals?: number;
    assists?: number;
    yellowCards?: number;
    redCards?: number;
    shots?: number;
    shotsOnTarget?: number;
    fouls?: number;
    offsides?: number;
    corners?: number;
    points?: number;
    rebounds?: number;
    blocks?: number;
    steals?: number;
    turnovers?: number;
    fieldGoalsMade?: number;
    fieldGoalsAttempted?: number;
    threePointersMade?: number;
    threePointersAttempted?: number;
    freeThrowsMade?: number;
    freeThrowsAttempted?: number;
  };
}
