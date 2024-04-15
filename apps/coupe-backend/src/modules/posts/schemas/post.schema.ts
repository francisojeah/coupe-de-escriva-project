import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { customTimestampPlugin } from '@/utils/custom-timestamp.plugin';
import { PostProps } from '../interfaces/post.interfaces';
import { Season } from '@/modules/seasons/schemas/season.schema';

export type PostsDocument = HydratedDocument<PostProps>;

@Schema({ timestamps: true })
export class Post {
    @Prop({ type: Types.ObjectId, ref: Season.name }) 
    season: Types.ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop({})
    image?: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    author: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.plugin(customTimestampPlugin);
