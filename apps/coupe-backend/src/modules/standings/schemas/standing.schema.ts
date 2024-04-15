import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  BasketballStandingMetric,
  FootballStandingMetric,
  StandingsProps,
  VolleyballStandingMetric,
} from '../interfaces/standing.interfaces';
import { customTimestampPlugin } from '@/utils/custom-timestamp.plugin';
import { Season } from '@/modules/seasons/schemas/season.schema';
import { Teams } from '@/modules/teams/schemas/team.schema';

export type StandingDocument = HydratedDocument<StandingsProps>;

@Schema({ timestamps: true })
export class Standing {
  @Prop({ type: Types.ObjectId, required: true, ref: Season.name })
  season: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: Teams.name })
  team: Types.ObjectId;

  @Prop({ required: true })
  position: number;

  @Prop({
    default: [],
  })
  metrics: (
    | { metric: FootballStandingMetric; value: number }
    | { metric: BasketballStandingMetric; value: number }
    | { metric: VolleyballStandingMetric; value: number }
  )[];
  
  @Prop()
  prevPosition?: number;
}

export const StandingSchema = SchemaFactory.createForClass(Standing);
StandingSchema.index({ season: 1, team: 1 }, { unique: true });
StandingSchema.plugin(customTimestampPlugin);
