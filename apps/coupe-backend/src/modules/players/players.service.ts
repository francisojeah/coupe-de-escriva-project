import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PlayerProps } from './interfaces/player.interfaces';
import { PlayerDto } from './dto/create-player.dto';
import { Player } from './schemas/player.schema';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Sports, TeamsProps } from '../teams/interfaces/team.interfaces';
import { Teams } from '../teams/schemas/team.schema';
import { SeasonsService } from '../seasons/seasons.service';
import { PlayerStats } from '../matches/interfaces/match.interfaces';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel(Player.name) private readonly playerModel: Model<Player>,
    @InjectModel(Teams.name) private readonly teamModel: Model<Teams>,
    private readonly seasonService: SeasonsService,
  ) {}

  async create(playerDto: PlayerDto): Promise<Player> {
    // Validate and convert season ID to ObjectId
    const seasonObjectId = Types.ObjectId.isValid(playerDto.season)
      ? new Types.ObjectId(playerDto.season)
      : null;

    if (!seasonObjectId) {
      return;
    }

    // Validate and convert team ID to ObjectId
    const teamObjectId = Types.ObjectId.isValid(playerDto.team)
      ? new Types.ObjectId(playerDto.team)
      : null;

    if (!teamObjectId) {
      throw new Error('Invalid teamId');
    }

    // Find the team based on the team ID
    const team = await this.teamModel.findById(teamObjectId);

    if (!team) {
      throw new Error('Team not found');
    }
    // Example methods - You should replace these with your actual implementation
    const relevantStats = this.getRelevantStats(team.sport);
    const defaultStats = this.getDefaultStats(relevantStats);

    // Create a new player with default stats
    const createdPlayer = new this.playerModel({
      ...playerDto,
      stats: defaultStats,
      season: seasonObjectId,
      team: teamObjectId,
    });

    return createdPlayer.save();
  }

  private getRelevantStats(sport: Sports): string[] {
    // Define relevant stats for each sport
    switch (sport) {
      case Sports.Football:
        return ['goals', 'assists', 'yellowCards', 'redCards', 'mvp'];
      case Sports.Basketball:
        return [
          'points',
          'assists',
          'rebounds',
          'blocks',
          'steals',
          'fouls',
          'mvp',
        ];
      case Sports.Volleyball:
        return ['points', 'blocks', 'assists', 'mvp'];
      default:
        return [];
    }
  }

  private getDefaultStats(relevantStats: string[]): Record<string, number> {
    // Initialize stats with all values as 0
    const defaultStats: Record<string, number> = {};
    relevantStats.forEach((stat) => {
      defaultStats[stat] = 0;
    });
    return defaultStats;
  }

  async findBySeasonDivisionSport(
    seasonId: string,
    division: string,
    sport: string,
  ): Promise<Player[]> {
    try {
      let seasonObjectId;
      if (seasonId && /^[0-9a-fA-F]{24}$/.test(seasonId)) {
        seasonObjectId = new Types.ObjectId(seasonId);
      } else {
        return;
      }

      // Find teams matching the provided division and sport
      const teams = await this.teamModel.find({ division, sport });

      // Extract team IDs
      const teamIds = teams.map((team) => team._id);

      // Find players whose team IDs match the retrieved team IDs and season
      const players = await this.playerModel
        .find({ season: seasonObjectId, team: { $in: teamIds } })
        .populate({ path: 'team' })
        .populate({ path: 'season' })
        .sort({ position: 1 })
        .exec();

      return players;
    } catch (error) {
      console.error(
        'Error finding players by season, division, and sport:',
        error,
      );
      throw error; // Rethrow the error to propagate it to the caller
    }
  }

  async findBySeason(seasonId: string): Promise<Player[]> {
    try {
      let seasonObjectId;
      if (seasonId && /^[0-9a-fA-F]{24}$/.test(seasonId)) {
        seasonObjectId = new Types.ObjectId(seasonId);
      } else {
        return;
      }

      // Find players whose team IDs match the retrieved team IDs and season
      const players = await this.playerModel
        .find({ season: seasonObjectId })
        .populate({ path: 'team' })
        .populate({ path: 'season' })
        .sort({ position: 1 })
        .exec();

      return players;
    } catch (error) {
      console.error('Error finding players by season:', error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  }

  async findByTeamId(teamId: string): Promise<Player[]> {
    try {
      let teamObjectId;
      if (teamId && /^[0-9a-fA-F]{24}$/.test(teamId)) {
        teamObjectId = new Types.ObjectId(teamId);
      } else {
        return;
      }

      // Find players whose team IDs match the retrieved team IDs and season
      const players = await this.playerModel
        .find({ team: teamObjectId })
        .populate({ path: 'team' })
        .populate({ path: 'season' })
        .sort({ position: 1 })
        .exec();

      return players;
    } catch (error) {
      console.error('Error finding players by season:', error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  }

  async getCurrentSeasonCount(): Promise<number> {
    try {
      const currentSeason = await this.seasonService.findCurrentSeason();
      if (!currentSeason) {
        throw new Error('No current season found');
      }

      const playersCount = await this.playerModel.countDocuments({
        season: currentSeason._id,
      });
      return playersCount;
    } catch (error) {
      console.error('Error finding players by current season:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<PlayerProps> {
    return this.playerModel.findById(id).exec();
  }

  async findAll(): Promise<PlayerProps[]> {
    return this.playerModel
      .find()
      .populate({ path: 'team' })
      .populate({ path: 'season' })
      .exec();
  }

  async update(
    id: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<PlayerProps> {
    return this.playerModel
      .findByIdAndUpdate(id, updatePlayerDto, { new: true })
      .exec();
  }

  async updatePlayerStats(
    playerId: string,
    sport: Sports,
    stat: PlayerStats,
  ): Promise<PlayerProps> {
    // Retrieve the player from the database
    const player = await this.playerModel.findById(playerId);

    if (!player) {
      throw new Error('Player not found');
    }

    // Check if the provided stats are relevant for the sport
    const relevantStats = this.getRelevantStats(sport);
    for (const key of Object.keys(stat)) {
      if (!relevantStats.includes(key)) {
        throw new Error(
          `Stat '${key}' is not relevant for the sport '${sport}'`,
        );
      }
    }

    // Update the player's stats based on the provided stats
    if (!player.stats) {
      player.stats = {};
    }
    for (const [key, value] of Object.entries(stat)) {
      if (!player.stats[key]) {
        player.stats[key] = 0;
      }
      player.stats[key] += value;
    }

    // Save the updated player to the database
    return await this.update(player._id.toString(), player);
  }

  async delete(id: string): Promise<void> {
    await this.playerModel.findByIdAndDelete(id).exec();
  }
}
