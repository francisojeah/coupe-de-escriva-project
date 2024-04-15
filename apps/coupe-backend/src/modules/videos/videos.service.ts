import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VideoProps, VideosWithDetails } from './interfaces/video.interfaces';
import { Video } from './schemas/video.schema';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
require('dotenv').config();

const { CHANNEL_ID, API_KEY } = process.env;

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name)
    private readonly videoModel: Model<Video>,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async create(): Promise<void> {
    try {
      // Get the most recent video's published date from the database
      const mostRecentVideo = await this.videoModel
        .findOne()
        .sort({ publishedAt: -1 })
        .limit(1)
        .exec();

      const mostRecentPublishedAt = mostRecentVideo
        ? new Date(mostRecentVideo.publishedAt)
        : null;

      // Fetch videos from the YouTube API
      const channelResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`,
      );

      const uploadsPlaylistId =
        channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;

      const videosResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&key=${API_KEY}&maxResults=10`,
      );

      // Extract video IDs from the response
      const videoIds: string[] = videosResponse.data.items
        .filter((item: any) => {
          const publishedAt = new Date(item.snippet.publishedAt);
          return !mostRecentPublishedAt || publishedAt > mostRecentPublishedAt;
        })
        .map((item: any) => item.snippet.resourceId.videoId);

      // Fetch more details for each video
      const videosWithDetails: VideosWithDetails = [];
      for (const videoId of videoIds) {
        // Get video details
        const videoDetailsResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${API_KEY}`,
        );

        // Extract relevant information from the response
        const videoDetails = videoDetailsResponse.data.items[0];
        const videoTags: string[] = videoDetails.snippet.tags || [];
        const videoDuration: string = videoDetails.contentDetails.duration;

        // Check if the video has any of the specified words in its tags
        if (
          videoTags.some((tag: string) =>
            ['Coupe de Escriva'].some((word: string) => tag.includes(word)),
          )
        ) {
          const video: any = {
            videoId: videoId,
            title: videoDetails.snippet.title,
            description: videoDetails.snippet.description,
            publishedAt: videoDetails.snippet.publishedAt,
            duration: videoDuration,
            tags: videoTags,
          };
          videosWithDetails.push(video);
        }
      }

      // Create videos in the database
      if (videosWithDetails.length > 0) {
        await this.videoModel.create(videosWithDetails);
        console.log(`${videosWithDetails.length} new videos created.`);
      } else {
        console.log('No new videos found.');
      }
    } catch (error) {
      console.error('Error creating videos:', error);
      // Handle the error gracefully, considering retry logic or other error handling strategies
      throw new Error('Failed to create videos');
    }
  }

  async findById(id: string): Promise<VideoProps> {
    return this.videoModel.findOne<VideoProps>({ _id: id }).exec();
  }

  async findAll(): Promise<VideoProps[]> {
    return this.videoModel.find().sort({ publishedAt: -1 }).exec();
  }

  async findVideosWithLimit(limit: number): Promise<VideoProps[]> {
    return this.videoModel.find().sort({ publishedAt: -1 }).limit(limit).exec();
  }

  async delete(id: string): Promise<void> {
    await this.videoModel.findByIdAndDelete(id).exec();
  }
}
