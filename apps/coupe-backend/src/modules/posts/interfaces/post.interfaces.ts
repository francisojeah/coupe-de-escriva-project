import { Types } from 'mongoose';

export interface PostProps {
  _id?: Types.ObjectId;
  season: Types.ObjectId;
  title?: string;
  image?: string;
  content?: string;
  author?: string; 
  toObject?: () => any;
}
