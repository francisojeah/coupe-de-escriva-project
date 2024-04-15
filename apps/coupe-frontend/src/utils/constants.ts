import { Division, Sports } from "../store/interfaces/user.interface";

export enum SportsType {
  FOOTBALL = "football",
  BASKETBALL = "basketball",
  VOLLEYBALL = "volleyball",
}

export const proxyAddress = "https://coupe-de-escriva-project.onrender.com";

export const getVideoId = (link: string): string => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
  const match = link.match(regex);
  if (match) {
    return match[1];
  }
  return "";
};

export function formatDateWithoutTime(dateString: any) {
  const dateObject = new Date(dateString);
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return formattedDate;
}

export interface VideoDetails {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  duration: string;
  tags: string[];
}

// Define type for the array of videos with details
export type VideosWithDetails = VideoDetails[];

export interface PostProps {
  _id?: any;
  season: any;
  title?: string;
  image?: string;
  content?: string;
  author?: string;
  createdAt?: string;
}

export enum FootballPosition {
  GOALKEEPER = "Goalkeeper",
  DEFENDER = "Defender",
  MIDFIELDER = "Midfielder",
  FORWARD = "Forward",
  // Add more positions as needed
}

export enum BasketballPosition {
  POINT_GUARD = "Point Guard",
  SHOOTING_GUARD = "Shooting Guard",
  SMALL_FORWARD = "Small Forward",
  POWER_FORWARD = "Power Forward",
  CENTER = "Center",
  // Add more positions as needed
}

export enum VolleyballPosition {
  SETTER = "Setter",
  OUTSIDE_HITTER = "Outside Hitter",
  MIDDLE_BLOCKER = "Middle Blocker",
  LIBERO = "Libero",
  OPPOSITE_HITTER = "Opposite Hitter",
  // Add more positions as needed
}

export enum PlayerRole {
  CAPTAIN = "Captain",
  COACH = "Coach",
  ASSISTANT_COACH = "Assistant Coach",
  ASSISTANT_CAPTAIN = "Assistant Captain",
  PLAYER = "Player",
  // Add more roles as needed
}

export interface PlayerProps {
  _id?: any;
  firstname: string;
  lastname: string;
  playerNumber: number;
  season: any;
  position: FootballPosition | BasketballPosition | VolleyballPosition;
  playerRole: PlayerRole;
  team: any;
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

export interface TeamsProps {
  _id?: any;
  name: string;
  sport: Sports;
  division: Division;
}

export const teamsList = [
  {
    title: "Blue Jays",
    logo: "/assets/images/blue-jays-logo.svg",
    label: "blue-jays",
    color: "#3F9CEC",
    textColor: "white",
    backgroundBanner: "/assets/images/blue-jays-background.png",
    players: [
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
    ],
  },
  {
    title: "Cirok",
    logo: "/assets/images/cirok-logo.svg",
    label: "cirok",
    color: "white",
    textColor: "black",
    backgroundBanner: "/assets/images/cirok-background.png",
    players: [],
  },
  {
    title: "Madiba",
    logo: "/assets/images/madiba-logo.svg",
    label: "madiba",
    color: "black",
    textColor: "white",
    backgroundBanner: "/assets/images/madiba-background.png",
    players: [],
  },
  {
    title: "TSG Walkers",
    logo: "/assets/images/tsg-walkers-logo.svg",
    label: "tsg-walkers",
    color: "#AA0F0D",
    textColor: "white",
    backgroundBanner: "/assets/images/tsg-background.png",
    players: [],
  },
];

// // Enums for football positions
// export enum FootballPosition {
//   Goalkeeper = 'GK',
//   RightBack = 'RB',
//   LeftBack = 'LB',
//   CenterBack = 'CB',
//   DefensiveMidfielder = 'DM',
//   CentralMidfielder = 'CM',
//   AttackingMidfielder = 'AM',
//   RightMidfielder = 'RM',
//   LeftMidfielder = 'LM',
//   RightWinger = 'RW',
//   LeftWinger = 'LW',
//   Striker = 'ST',
//   Substitute = 'SUB',
// }

// // Enums for football formations
// export enum FootballFormation {
//   FourFourTwo = '4-4-2',
//   FourThreeThree = '4-3-3',
//   ThreeFiveTwo = '3-5-2',
//   FourTwoThreeOne = '4-2-3-1',
//   FourFiveOne = '4-5-1',
//   FiveFourOne = '5-4-1',
//   FourOneFourOne = '4-1-4-1',
// }

// // Enums for basketball positions
// export enum BasketballPosition {
//   PointGuard = 'PG',
//   ShootingGuard = 'SG',
//   SmallForward = 'SF',
//   PowerForward = 'PF',
//   Center = 'C',
//   SixthMan = '6th Man',
// }

// // Enums for basketball formations
// export enum BasketballFormation {
//   ThreeTwo = '3-2',
//   FourOne = '4-1',
//   FiveOut = '5-Out',
//   TwoThree = '2-3',
//   OneTwoTwo = '1-2-2',
//   Triangle = 'Triangle',
// }

// // Enums for volleyball positions
// export enum VolleyballPosition {
//   Setter = 'Setter',
//   OutsideHitter = 'Outside Hitter',
//   MiddleBlocker = 'Middle Blocker',
//   OppositeHitter = 'Opposite Hitter',
//   Libero = 'Libero',
//   Substitute = 'SUB',
// }

// // Enums for volleyball formations
// export enum VolleyballFormation {
//   FiveOne = '5-1',
//   SixTwo = '6-2',
//   FourTwo = '4-2',
//   ThreeThree = '3-3',
//   FourFour = '4-4',
// }

// Define types for stats
export interface PlayerStats {
  [playerId: string]: {
    [stat: string]: number;
  };
}

// Define interface for player lineup
interface PlayerLineup {
  stats?: any;
  player_id: any;
  isSubstitute: boolean;
}
export const toCamelCase = (str: any) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getRelevantStats = (sport: any) => {
  // Define relevant stats for each sport
  switch (sport) {
    case Sports.Football:
      return ["goals", "assists", "yellowCards", "redCards", "mvp"];
    case Sports.Basketball:
      return [
        "points",
        "assists",
        "rebounds",
        "blocks",
        "steals",
        "fouls",
        "mvp",
      ];
    case Sports.Volleyball:
      return ["points", "blocks", "assists", "mvp"];
    default:
      return [];
  }
};

export enum GameWeek {
  GameWeek1 = "GameWeek 1",
  GameWeek2 = "GameWeek 2",
  GameWeek3 = "GameWeek 3",
  GameWeek4 = "GameWeek 4",
  GameWeek5 = "GameWeek 5",
  GameWeek6 = "GameWeek 6",
  Finals = "Finals",
  Playoffs = "Playoffs",
}

// Define interface for team lineup
export interface TeamLineup {
  team_id: any;
  players: PlayerLineup[];
}

// Define interface for fixture
export interface Fixture {
  home_team_id: any;
  away_team_id: any;
  date: string;
  result?: {
    home_team_score: number;
    away_team_score: number;
  };
  lineup?: {
    home?: TeamLineup;
    away?: TeamLineup;
  };
  stats?: PlayerStats;
  image?: string;
  gameweek: GameWeek;
}

// Define interface for fixture result properties
export interface FixtureResultProps {
  sport: string;
  division: string;
  season: any;
  fixtures: Fixture;
}

export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  return formattedDate;
};
