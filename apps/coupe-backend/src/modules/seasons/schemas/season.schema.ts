import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { customTimestampPlugin } from '@/utils/custom-timestamp.plugin';
import { SeasonProps } from '../interfaces/season.interfaces';

export type SeasonDocument = HydratedDocument<SeasonProps>;

@Schema({ timestamps: true })
export class Season {
  @Prop({ unique: true, required: true })
  season: string;

  @Prop({ default: false })
  currentSeason: boolean;
}

export const SeasonSchema = SchemaFactory.createForClass(Season);
SeasonSchema.plugin(customTimestampPlugin);
