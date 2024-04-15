import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamsProps } from './interfaces/team.interfaces';
import { UpdateTeamsDto } from './dto/update-team.dto';
import { Teams } from './schemas/team.schema';
import { CreateTeamsDto } from './dto/create-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Teams.name) private teamModel: Model<Teams>,
  ) {}

  async create(createTeamDto: CreateTeamsDto): Promise<TeamsProps> {
    const createdTeam = new this.teamModel(createTeamDto);
    return createdTeam.save();
  }

  async findById(id: string): Promise<TeamsProps> {
    return this.teamModel.findById(id).exec();
  }

  async findAll() {
    return this.teamModel.find<TeamsProps>().sort({ name: 1, sport: 1 });
  }


  async update(id: string, updateTeamDto: UpdateTeamsDto): Promise<any> {
    return this.teamModel
      .findByIdAndUpdate(id, updateTeamDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.teamModel.findByIdAndDelete(id).exec();
  }

}
