import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import {
  FootballPosition,
  BasketballPosition,
  VolleyballPosition,
  FootballFormation,
  BasketballFormation,
  VolleyballFormation,
  GameWeek,
  PlayerStats,
} from '../interfaces/match.interfaces';

// DTO for player lineup
export class PlayerLineupDto {
  @ApiProperty()
  player_id: Types.ObjectId;

  @ApiProperty()
  stats?: PlayerStats;

  @ApiProperty()
  isSubstitute: boolean;
}

// DTO for team lineup
export class TeamLineupDto {
  @ApiProperty()
  team_id: Types.ObjectId;

  @ApiProperty({ type: [PlayerLineupDto] })
  players: PlayerLineupDto[];
}

// DTO for fixture
export class FixtureDto {
  @ApiProperty()
  home_team_id: Types.ObjectId;

  @ApiProperty()
  away_team_id: Types.ObjectId;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  result?: {
    home_team_score: number;
    away_team_score: number;
  };

  @ApiProperty({ type: TeamLineupDto })
  lineup?: {
    home?: TeamLineupDto;
    away?: TeamLineupDto;
  };

  @ApiProperty()
  gameweek?: GameWeek;
}

// DTO for fixture result properties
export class FixtureResultDto {
  @ApiProperty()
  sport: string;

  @ApiProperty()
  division: string;

  @ApiProperty()
  season: Types.ObjectId;

  @ApiProperty({ type: FixtureDto })
  fixtures: FixtureDto;
}

export class SubstitutionDto {
  @ApiProperty()
  team: Types.ObjectId; // Indicates the team making the substitution

  @ApiProperty()
  playerOutId: Types.ObjectId; // ID of the player going out

  @ApiProperty()
  playerInId: Types.ObjectId; // ID of the player coming in
}

export class UpdateStatsDto {
  @ApiProperty()
  team: Types.ObjectId; // Indicates the team for which the stats are being updated

  @ApiProperty()
  stat: PlayerStats;

  @ApiProperty({ required: false })
  player_id?: Types.ObjectId; // Optional player ID if the stat is player-specific
}