import { Types } from 'mongoose';

// Enums for football positions
export enum FootballPosition {
  Goalkeeper = 'GK',
  RightBack = 'RB',
  LeftBack = 'LB',
  CenterBack = 'CB',
  DefensiveMidfielder = 'DM',
  CentralMidfielder = 'CM',
  AttackingMidfielder = 'AM',
  RightMidfielder = 'RM',
  LeftMidfielder = 'LM',
  RightWinger = 'RW',
  LeftWinger = 'LW',
  Striker = 'ST',
  Substitute = 'SUB',
}

// Enums for football formations
export enum FootballFormation {
  FourFourTwo = '4-4-2',
  FourThreeThree = '4-3-3',
  ThreeFiveTwo = '3-5-2',
  FourTwoThreeOne = '4-2-3-1',
  FourFiveOne = '4-5-1',
  FiveFourOne = '5-4-1',
  FourOneFourOne = '4-1-4-1',
}

// Enums for basketball positions
export enum BasketballPosition {
  PointGuard = 'PG',
  ShootingGuard = 'SG',
  SmallForward = 'SF',
  PowerForward = 'PF',
  Center = 'C',
  SixthMan = '6th Man',
}

// Enums for basketball formations
export enum BasketballFormation {
  ThreeTwo = '3-2',
  FourOne = '4-1',
  FiveOut = '5-Out',
  TwoThree = '2-3',
  OneTwoTwo = '1-2-2',
  Triangle = 'Triangle',
}

// Enums for volleyball positions
export enum VolleyballPosition {
  Setter = 'Setter',
  OutsideHitter = 'Outside Hitter',
  MiddleBlocker = 'Middle Blocker',
  OppositeHitter = 'Opposite Hitter',
  Libero = 'Libero',
  Substitute = 'SUB',
}

// Enums for volleyball formations
export enum VolleyballFormation {
  FiveOne = '5-1',
  SixTwo = '6-2',
  FourTwo = '4-2',
  ThreeThree = '3-3',
  FourFour = '4-4',
}

// Define types for stats
export interface PlayerStats {
  [stat: string]: number;
}

// Define interface for player lineup
interface PlayerLineup {
  stats?: PlayerStats; // Change to PlayerStats (object) instead of PlayerStats[] (array)
  player_id: Types.ObjectId;
  isSubstitute: boolean;
}

export enum GameWeek {
  GameWeek1 = 'GameWeek 1',
  GameWeek2 = 'GameWeek 2',
  GameWeek3 = 'GameWeek 3',
  GameWeek4 = 'GameWeek 4',
  GameWeek5 = 'GameWeek 5',
  GameWeek6 = 'GameWeek 6',
  Finals = 'Finals',
  Playoffs = 'Playoffs',
}

// Define interface for team lineup
export interface TeamLineup {
  team_id: Types.ObjectId;
  players: PlayerLineup[];
}

// Define interface for fixture
export interface Fixture {
  home_team_id: Types.ObjectId;
  away_team_id: Types.ObjectId;
  date: Date;
  result?: {
    home_team_score: number;
    away_team_score: number;
  };
  lineup?: {
    home?: TeamLineup;
    away?: TeamLineup;
  };
  gameweek?: GameWeek;
}

// Define interface for fixture result properties
export interface FixtureResultProps {
  _id?: any,
  sport: string;
  division: string;
  season: any;
  fixtures: Fixture;
  toObject?: () => any;
}
