import { Division, Sports } from '@/modules/teams/interfaces/team.interfaces';
import { Types } from 'mongoose';

export enum FootballStandingMetric {
  PLAYED = 'Played',
  WINS = 'Wins',
  DRAWS = 'Draws',
  LOSSES = 'Losses',
  GOALS_FOR = 'Goals For',
  GOALS_AGAINST = 'Goals Against',
  GOAL_DIFFERENCE = 'Goal Difference',
  POINTS = 'Points',
}

export enum BasketballStandingMetric {
  PLAYED = 'Played',
  WINS = 'Wins',
  LOSSES = 'Losses',
  WINNING_PERCENTAGE = 'Winning Percentage',
  POINTS_FOR = 'Points For',
  POINTS_AGAINST = 'Points Against',
  POINT_DIFFERENCE = 'Point Difference',
  POINTS = 'Points',
}

export enum VolleyballStandingMetric {
  PLAYED = 'Played',
  WINS = 'Wins',
  LOSSES = 'Losses',
  WINNING_PERCENTAGE = 'Winning Percentage',
  SETS_WON = 'Sets Won',
  SETS_LOST = 'Sets Lost',
  SET_DIFFERENCE = 'Set Difference',
  POINTS = 'Points',
}

export interface StandingsProps {
  _id?: Types.ObjectId;
  season: Types.ObjectId;
  team: any;
  position: number;
  metrics: (
    | { metric: FootballStandingMetric; value: number }
    | { metric: BasketballStandingMetric; value: number }
    | { metric: VolleyballStandingMetric; value: number }
  )[];
  prevPosition?: number;
  toObject?: () => any;
}

// {
//   "season": "615f012c9c2dfc6a1fd1d5d8",
//   "team": "615f012c9c2dfc6a1fd1d5d9",
//   "position": 1,
//   "metrics": [
//     {
//       "metric": "Wins",
//       "value": 0
//     },
//     {
//       "metric": "Draws",
//       "value": 0
//     },
//     {
//       "metric": "Losses",
//       "value": 0
//     },
//     {
//       "metric": "Goals For",
//       "value": 0
//     },
//     {
//       "metric": "Goals Against",
//       "value": 0
//     },
//     {
//       "metric": "Goal Difference",
//       "value": 0
//     },
//     {
//       "metric": "Points",
//       "value": 0
//     }
//   ],
//   "prevPosition": 0
// }

// {
//   "season": "615f012c9c2dfc6a1fd1d5d8",
//   "team": "615f012c9c2dfc6a1fd1d5d9",
//   "position": 1,
//   "metrics": [
//     {
//       "metric": "Wins",
//       "value": 0
//     },
//     {
//       "metric": "Losses",
//       "value": 0
//     },
//     {
//       "metric": "Winning Percentage",
//       "value": 0
//     },
//     {
//       "metric": "Points For",
//       "value": 0
//     },
//     {
//       "metric": "Points Against",
//       "value": 0
//     },
//     {
//       "metric": "Point Difference",
//       "value": 0
//     },
//     {
//       "metric": "Points",
//       "value": 0
//     }
//   ],
//   "prevPosition": 0
// }

// {
//   "season": "615f012c9c2dfc6a1fd1d5d8",
//   "team": "615f012c9c2dfc6a1fd1d5d9",
//   "position": 1,
//   "metrics": [
//     {
//       "metric": "Wins",
//       "value": 0
//     },
//     {
//       "metric": "Losses",
//       "value": 0
//     },
//     {
//       "metric": "Winning Percentage",
//       "value": 0
//     },
//     {
//       "metric": "Sets Won",
//       "value": 0
//     },
//     {
//       "metric": "Sets Lost",
//       "value": 0
//     },
//     {
//       "metric": "Set Difference",
//       "value": 0
//     },
//     {
//       "metric": "Points",
//       "value": 0
//     }
//   ],
//   "prevPosition": 0
// }
