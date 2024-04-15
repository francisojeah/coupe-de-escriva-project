import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { customTimestampPlugin } from '@/utils/custom-timestamp.plugin';
import { Division, Sports, TeamsProps} from '../interfaces/team.interfaces';


export type TeamsDocument = HydratedDocument<TeamsProps>;

@Schema({ timestamps: true })
export class Teams {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    sport: Sports;

    @Prop({ required: true })
    division: Division;

}

export const TeamsSchema = SchemaFactory.createForClass(Teams);
TeamsSchema.index({ name: 1, sport: 1, division: 1 }, { unique: true });
TeamsSchema.plugin(customTimestampPlugin);
