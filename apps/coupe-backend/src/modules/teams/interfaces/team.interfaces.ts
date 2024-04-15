import { Types } from 'mongoose';

export enum Division {
  Mens = 'mens',
  Womens = 'womens',
}

export enum Sports {
  Football = 'football',
  Basketball = 'basketball',
  Volleyball = 'volleyball',
}

export interface TeamsProps {
  _id?: Types.ObjectId;
  name: string;
  sport: Sports;
  division: Division;
  toObject?: () => any;
}