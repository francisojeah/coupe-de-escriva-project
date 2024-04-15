import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { customTimestampPlugin } from '@/utils/custom-timestamp.plugin';
import { Season } from '@/modules/seasons/schemas/season.schema';
import { Fixture, FixtureResultProps } from '../interfaces/match.interfaces';



export type FixturesResultsDocument = HydratedDocument<FixtureResultProps>;

@Schema({ timestamps: true })
export class FixturesResults {
    @Prop({ required: true })
    sport: string;

    @Prop({ required: true })
    division: string;

    @Prop({ type: Types.ObjectId, ref: Season.name })
    season: Types.ObjectId;

    @Prop({ required: true, type: Object }) // Use Fixture interface directly here
    fixtures: Fixture;
}

export const FixturesResultsSchema = SchemaFactory.createForClass(FixturesResults);
FixturesResultsSchema.plugin(customTimestampPlugin);
