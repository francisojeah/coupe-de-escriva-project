import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  BasketballPosition,
  FootballPosition,
  PlayerProps,
  PlayerRole,
  VolleyballPosition,
} from '../interfaces/player.interfaces';
import { customTimestampPlugin } from '@/utils/custom-timestamp.plugin';
import { Teams } from '@/modules/teams/schemas/team.schema';
import { Season } from '@/modules/seasons/schemas/season.schema';

export type PlayerDocument = HydratedDocument<PlayerProps>;

@Schema({ timestamps: true })
export class Player {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  playerNumber: number;

  @Prop({ type: Types.ObjectId, ref: Season.name })
  season: Types.ObjectId;

  @Prop()
  position: FootballPosition | BasketballPosition | VolleyballPosition;

  @Prop({ enum: PlayerRole })
  playerRole: PlayerRole;

  @Prop({ type: Types.ObjectId, ref: Teams.name })
  team: Types.ObjectId;

  @Prop()
  profileImage?: string;

  @Prop({
    type: {
      goals: { type: Number },
      assists: { type: Number },
      yellowCards: { type: Number },
      redCards: { type: Number },
      shots: { type: Number },
      shotsOnTarget: { type: Number },
      fouls: { type: Number },
      offsides: { type: Number },
      corners: { type: Number },
      points: { type: Number },
      rebounds: { type: Number },
      blocks: { type: Number },
      steals: { type: Number },
      turnovers: { type: Number },
      fieldGoalsMade: { type: Number },
      fieldGoalsAttempted: { type: Number },
      threePointersMade: { type: Number },
      threePointersAttempted: { type: Number },
      freeThrowsMade: { type: Number },
      freeThrowsAttempted: { type: Number },
    },
  })
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
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
PlayerSchema.plugin(customTimestampPlugin);
