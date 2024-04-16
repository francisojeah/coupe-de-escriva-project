import { BasketballPosition, FootballPosition, GameWeek, PlayerRole, VolleyballPosition } from "../../utils/constants";

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export interface UserSignupProps {
  email: string;
  password: string;
  cpassword: string;
}

export interface UserStateProps {
  _id?: any;
  account?: string | null;
  user?: UserProps | null;
  isRegistering?: boolean;
  isLoggin?: boolean;
  isLoading?: boolean;
  errMsg?: ErrorProps | null | any;
  isRegistered?: boolean;
  loggin?: boolean;
  updatingProfile?: boolean;
  updatedProfile?: boolean;
  isAuthenticated?: boolean;
  updated?: boolean;
  token?: string | any;
  reqResettingPass?: boolean;
  passwordRequestedProps?: {
    msg: string;
    passwordRequested: boolean;
    email: string;
  } | null;
  changedPasswordProps?: {
    msg: string;
    changed: boolean;
  } | null;
  loadingUsers?: boolean;
  createdUsers?: any[] | null;
}

export interface LoginProps {
    email: string;
    password: string;
  }

export interface AuthProps {
    email?: string;
    password?: string;
  }
  
  export interface ErrorProps {
    msg: string;
    Id: string;
  }

  export interface UserProps {
    _id?: any;
    firstname: string;
    lastname: string;
    password?: string;
    email: string;
    profileImage?: string;
    isVerified: boolean;
    roles: Role[];
  }




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

  export interface TeamLineup {
    team_id: any;
    players: PlayerLineup[];
  }

  export interface PlayerStats {
    [stat: string]: number;
  }
  
  export interface PlayerLineup {
    stats?: PlayerStats;
    player_id: any;
    isSubstitute: boolean;
  }

  export enum FootballStandingMetricAbbreviation {
    PLAYED = 'PL',
    WINS = 'W',
    DRAWS = 'D',
    LOSSES = 'L',
    GOALS_FOR = 'GF',
    GOALS_AGAINST = 'GA',
    GOAL_DIFFERENCE = 'GD',
    POINTS = 'Pts',
  }
  
  export enum BasketballStandingMetricAbbreviation {
    PLAYED = 'PL',
    WINS = 'W',
    LOSSES = 'L',
    WINNING_PERCENTAGE = 'WP',
    POINTS_FOR = 'PF',
    POINTS_AGAINST = 'PA',
    POINT_DIFFERENCE = 'PD',
    POINTS = 'Pts',
  }
  
  export enum VolleyballStandingMetricAbbreviation {
    PLAYED = 'PL',
    WINS = 'W',
    LOSSES = 'L',
    WINNING_PERCENTAGE = 'WP',
    SETS_WON = 'SW',
    SETS_LOST = 'SL',
    SET_DIFFERENCE = 'SD',
    POINTS = 'Pts',
  }

  export enum Division {
    Mens = 'mens',
    Womens = 'womens',
  }
  
  export enum Sports {
    Football = 'football',
    Basketball = 'basketball',
    Volleyball = 'volleyball',
  }
  
  export interface StandingsProps {
    _id: any;
    season: any;
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
  
  export interface PlayerProps {
    _id?: string;
    firstname: string;
    lastname: string;
    playerNumber: number;
    season: string;
    position: FootballPosition | BasketballPosition | VolleyballPosition;
    playerRole: PlayerRole;
    team: string;
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
  }
  

  
  export interface AddPlayerProps {
    firstname: string;
    lastname: string;
    playerNumber: number;
    season: string;
    position: FootballPosition | BasketballPosition | VolleyballPosition;
    playerRole: PlayerRole;
    team: string;
    profileImage?: string;
  }

  export interface EditPlayerProps {
    firstname: string;
    lastname: string;
    playerNumber: number;
    season?: string;
    position: FootballPosition | BasketballPosition | VolleyballPosition;
    playerRole: PlayerRole;
    team?: string;
    profileImage?: string;
  }

  export interface AddPostProps {
    season: string;
    title: string;
    image?: string;
    content: string;
    author: string; 
  }

  export interface AddPictureProps {
    season: any;
    sport: string;
    gameweek: GameWeek; 
    image: string;
    date: string;
  }

  export interface AddMatchStatsProps {
    team: string 
    stat: PlayerStats;
    player_id: string
  }

  export interface AddFixtureResultProps {
    sport: string;
    division: string;
    season: string;
    fixtures: AddFixture;
}

export interface AddFixture {
  home_team_id: string;
  away_team_id: string;
  date: string;
  gameweek: GameWeek;
}