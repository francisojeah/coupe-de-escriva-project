import { Types } from "mongoose";

export interface SeasonProps {
  _id?: string;
  season: string;
  currentSeason: boolean;
  toObject?: () => any;
}

