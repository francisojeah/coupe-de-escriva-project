import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { customTimestampPlugin } from '@/utils/custom-timestamp.plugin';
import { VideoProps } from '../interfaces/video.interfaces';

export type VideosDocument = HydratedDocument<VideoProps>;

@Schema({ timestamps: true })
export class Video {
  @Prop({ unique: true, required: true })
  videoId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  publishedAt: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  tags: string[];
}

export const VideoSchema = SchemaFactory.createForClass(Video);
VideoSchema.plugin(customTimestampPlugin);
