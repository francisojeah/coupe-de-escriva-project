import { Division, Sports } from '@/modules/teams/interfaces/team.interfaces';
import { Types } from 'mongoose';

export enum FootballPosition {
  GOALKEEPER = 'Goalkeeper',
  DEFENDER = 'Defender',
  MIDFIELDER = 'Midfielder',
  FORWARD = 'Forward',
}

export enum BasketballPosition {
  POINT_GUARD = 'Point Guard',
  SHOOTING_GUARD = 'Shooting Guard',
  SMALL_FORWARD = 'Small Forward',
  POWER_FORWARD = 'Power Forward',
  CENTER = 'Center',
}

export enum VolleyballPosition {
  SETTER = 'Setter',
  OUTSIDE_HITTER = 'Outside Hitter',
  MIDDLE_BLOCKER = 'Middle Blocker',
  LIBERO = 'Libero',
  OPPOSITE_HITTER = 'Opposite Hitter',
}

export enum PlayerRole {
  CAPTAIN = 'Captain',
  COACH = 'Coach',
  ASSISTANT_COACH = 'Assistant Coach',
  ASSISTANT_CAPTAIN = 'Assistant Captain',
  PLAYER = 'Player',
  // Add more roles as needed
}

export interface PlayerProps {
  _id?: Types.ObjectId;
  firstname: string;
  lastname: string;
  playerNumber: number;
  season: Types.ObjectId;
  position: FootballPosition | BasketballPosition | VolleyballPosition;
  playerRole: PlayerRole;
  team: Types.ObjectId;
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
  profileImage?: string;
  toObject?: () => any;
}
