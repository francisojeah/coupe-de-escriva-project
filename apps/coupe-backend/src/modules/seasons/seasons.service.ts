import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SeasonProps } from './interfaces/season.interfaces';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { CreateSeasonDto } from './dto/create-season.dto';
import { Season } from './schemas/season.schema';

@Injectable()
export class SeasonsService {
  constructor(
    @InjectModel(Season.name) private seasonModel: Model<Season>,
  ) {}

  async create(createSeasonDto: CreateSeasonDto): Promise<any> {
    const createdSeason = new this.seasonModel(createSeasonDto);
    return createdSeason.save();
  }

  async findById(id: string): Promise<any> {
    return this.seasonModel.findById(id).exec();
  }

  async findCurrentSeason(): Promise<any> {
    const season = await this.seasonModel.findOne({ currentSeason: true }).exec();
    return season;
}

  async findAll() {
    const seasons = await this.seasonModel.find();
    return seasons;
  }

  async update(id: string, updateSeasonDto: UpdateSeasonDto): Promise<any> {
    return this.seasonModel
      .findByIdAndUpdate(id, updateSeasonDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.seasonModel.findByIdAndDelete(id).exec();
  }
}
