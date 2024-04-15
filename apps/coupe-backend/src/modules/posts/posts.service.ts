import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PostProps } from './interfaces/post.interfaces';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schemas/post.schema';
import { SeasonsService } from '../seasons/seasons.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,

    private readonly seasonsService: SeasonsService,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<PostProps> {
    const currentSeason = await this.seasonsService.findCurrentSeason();

    const createdPost = new this.postModel({
      ...createPostDto,
      season: currentSeason._id, // Set the season to the current season's ID
    });

    return createdPost.save();
  }

  async findById(id: string): Promise<PostProps> {
    return await this.postModel.findOne<PostProps>({ _id: id }).exec();
  }

  async findBySeason(seasonId: string): Promise<PostProps[]> {
    const seasonObjectId =
      seasonId && /^[0-9a-fA-F]{24}$/.test(seasonId)
        ? new Types.ObjectId(seasonId)
        : undefined;

        if (!seasonObjectId) {
          return
        }

    // Query posts for the given seasonId
    return await this.postModel
      .find({ season: seasonObjectId }) 
      .sort({ createdAt: -1 })
      .exec();
  }

  async findBySeasonWithLimit(seasonId: string, limit: number): Promise<any[]> {
    const seasonObjectId =
      seasonId && /^[0-9a-fA-F]{24}$/.test(seasonId)
        ? new Types.ObjectId(seasonId)
        : undefined;

        if (!seasonObjectId) {
          return
        }

    // Query posts for the given seasonId
    return await this.postModel
      .find({ season: seasonObjectId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async findAll(): Promise<PostProps[]> {
    return await this.postModel.find().sort({ createdAt: -1 }).exec();
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<PostProps> {
    return await this.postModel
      .findByIdAndUpdate(id, updatePostDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.postModel.findByIdAndDelete(id).exec();
  }
}
