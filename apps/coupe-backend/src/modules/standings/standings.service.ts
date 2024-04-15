import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Standing } from './schemas/standing.schema';
import { StandingDto } from './dto/create-standing.dto';
import {
  BasketballStandingMetric,
  FootballStandingMetric,
  StandingsProps,
  VolleyballStandingMetric,
} from './interfaces/standing.interfaces';
import { UpdateStandingsDto } from './dto/update-standing.dto';
import { Teams } from '../teams/schemas/team.schema';
import { SeasonsService } from '../seasons/seasons.service';
import { Sports } from '../teams/interfaces/team.interfaces';

@Injectable()
export class StandingsService {
  constructor(
    @InjectModel(Teams.name) private readonly teamModel: Model<Teams>,
    @InjectModel(Standing.name) private readonly standingModel: Model<Standing>,

    private readonly seasonsService: SeasonsService,
  ) {}

  async createStandings(): Promise<void> {
    // Fetch teams sorted alphabetically by name within each division and sport
    const teams = await this.teamModel
      .find()
      .sort({ division: 1, sport: 1, name: 1 })
      .exec();

    const currentSeason = await this.seasonsService.findCurrentSeason();

    // Create an array to store standings
    const standings = [];

    // Initialize position counter
    let positionCounter = 1;

    // Iterate over sorted teams
    for (const team of teams) {
      // Get metrics for the team's sport and division
      const metrics = this.getMetricsForSportAndDivision(
        team.sport,
        team.division,
      );

      // Push standing object to standings array
      standings.push({
        season: currentSeason._id,
        team: team._id,
        position: positionCounter,
        prevPosition: positionCounter,
        metrics,
      });

      // Increment position counter
      positionCounter++;

      // Reset position counter to 1 after it reaches 4
      if (positionCounter > 4) {
        positionCounter = 1;
      }
    }

    // Use bulk write operation to insert standings efficiently
    await this.standingModel.insertMany(standings);
  }

  private getMetricsForSportAndDivision(sport: string, division: string) {
    switch (sport) {
      case 'football':
        return this.getFootballMetrics();
      case 'basketball':
        return this.getBasketballMetrics();
      case 'volleyball':
        return this.getVolleyballMetrics();
      default:
        throw new Error('Invalid sport');
    }
  }

  private getFootballMetrics() {
    return [
      { metric: FootballStandingMetric.PLAYED, value: 0 },
      { metric: FootballStandingMetric.WINS, value: 0 },
      { metric: FootballStandingMetric.DRAWS, value: 0 },
      { metric: FootballStandingMetric.LOSSES, value: 0 },
      { metric: FootballStandingMetric.GOALS_FOR, value: 0 },
      { metric: FootballStandingMetric.GOALS_AGAINST, value: 0 },
      { metric: FootballStandingMetric.GOAL_DIFFERENCE, value: 0 },
      { metric: FootballStandingMetric.POINTS, value: 0 },
    ];
  }

  private getBasketballMetrics() {
    return [
      { metric: BasketballStandingMetric.PLAYED, value: 0 },
      { metric: BasketballStandingMetric.WINS, value: 0 },
      { metric: BasketballStandingMetric.LOSSES, value: 0 },
      { metric: BasketballStandingMetric.WINNING_PERCENTAGE, value: 0 },
      { metric: BasketballStandingMetric.POINTS_FOR, value: 0 },
      { metric: BasketballStandingMetric.POINTS_AGAINST, value: 0 },
      { metric: BasketballStandingMetric.POINT_DIFFERENCE, value: 0 },
      { metric: BasketballStandingMetric.POINTS, value: 0 },
    ];
  }

  private getVolleyballMetrics() {
    return [
      { metric: VolleyballStandingMetric.WINS, value: 0 },
      { metric: VolleyballStandingMetric.PLAYED, value: 0 },
      { metric: VolleyballStandingMetric.LOSSES, value: 0 },
      { metric: VolleyballStandingMetric.WINNING_PERCENTAGE, value: 0 },
      { metric: VolleyballStandingMetric.SETS_WON, value: 0 },
      { metric: VolleyballStandingMetric.SETS_LOST, value: 0 },
      { metric: VolleyballStandingMetric.SET_DIFFERENCE, value: 0 },
      { metric: VolleyballStandingMetric.POINTS, value: 0 },
    ];
  }

  async create(standingDto: StandingDto): Promise<StandingsProps> {
    const createdStanding = new this.standingModel(standingDto);
    return await createdStanding.save();
  }

  async findAll(): Promise<Standing[]> {
    return await this.standingModel
      .find()
      .populate({ path: 'team', select: '_id name division sport' })
      .populate({ path: 'season' })
      .exec();
  }

  async findBySeason(seasonId: string): Promise<Standing[]> {
    const seasonObjectId =
      seasonId && /^[0-9a-fA-F]{24}$/.test(seasonId)
        ? new Types.ObjectId(seasonId)
        : undefined;

    if (!seasonObjectId) {
      return;
    }
    return await this.standingModel
      .find({ season: seasonObjectId })
      .populate({
        path: 'team',
      })
      .exec();
  }

  async findBySeasonDivisionSport(
    seasonId: string,
    division: string,
    sport: string,
  ): Promise<StandingsProps[]> {
    try {
      const seasonObjectId =
        seasonId && /^[0-9a-fA-F]{24}$/.test(seasonId)
          ? new Types.ObjectId(seasonId)
          : undefined;

      if (!seasonObjectId) {
        return;
      }

      // Use aggregation to filter standings by season, division, and sport
      return await this.standingModel.aggregate([
        {
          $match: { season: seasonObjectId },
        },
        {
          $lookup: {
            from: 'teams', // Assuming 'teams' is the name of the collection for teams
            localField: 'team',
            foreignField: '_id',
            as: 'team',
          },
        },
        {
          $unwind: '$team', // Unwind the 'team' array
        },
        {
          $match: {
            'team.division': division,
            'team.sport': sport,
          },
        },
        {
          $sort: { position: 1 }, // Sort by position in ascending order
        },
      ]);
    } catch (error) {
      console.error(
        'Error finding standings by season, division, and sport:',
        error,
      );
      throw error; // Rethrow the error to propagate it to the caller
    }
  }

  async findById(id: Types.ObjectId): Promise<StandingsProps> {
    try {
      return await this.standingModel
        .findOne({ team: id })
        .populate({
          path: 'team',
        })
        .exec();
    } catch (error) {
      console.error('Error finding standings ', error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  }

  async updateStandingAndPosition(
    id: string,
    updateStandingsDto: any,
  ): Promise<StandingsProps> {
    // Update standing document with division and sport populated from team
    const updatedStanding = await this.standingModel
      .findByIdAndUpdate(id, updateStandingsDto, { new: true })
      .populate({
        path: 'team',
        select: 'division sport', // Select only the division and sport fields
      })
      .exec();

    if (!updatedStanding) {
      throw new Error('Standing not found');
    }

    // Extract division and sport from the populated team field
    const { division, sport }: any = updatedStanding.team;

    // Update current position
    await this.updateCurrentPosition(
      updateStandingsDto.season,
      division,
      sport,
    );

    return updatedStanding;
  }

  async updateCurrentPosition(
    seasonId: string,
    division: string,
    sport: string,
  ): Promise<void> {
    // Find standings by populating the 'team' field and filtering by 'division' and 'sport'
    const standings: any = await this.findBySeasonDivisionSport(
      seasonId,
      division,
      sport,
    );

    // Sort standings using the compareStandings function
    standings.sort((a, b) => this.compareStandings(a, b));

    let position = 1;
    for (const standing of standings) {
      // Update position and prevPosition if necessary
      if (
        standing.position !== position ||
        standing.prevPosition !== position
      ) {
        await this.standingModel.findByIdAndUpdate(standing._id, {
          prevPosition: standing.position,
          position,
        });
      }
      position++;
    }
  }

  private getMetricValue(standing: any, metric: any): number {
    const pointsMetric = standing.metrics.find((m: any) => m.metric === metric);
    return pointsMetric ? pointsMetric.value : 0;
  }

  private compareStandings(a: any, b: any): number {
    const aPoints = this.getMetricValue(a, FootballStandingMetric.POINTS);
    const bPoints = this.getMetricValue(b, FootballStandingMetric.POINTS);

    if (aPoints !== bPoints) {
      return bPoints - aPoints; // Higher points first
    }

    // If points are equal, check goal differences for football
    if (a.team.sport === Sports.Football && b.team.sport === Sports.Football) {
      const aGoalDifference = this.getMetricValue(
        a,
        FootballStandingMetric.GOAL_DIFFERENCE,
      );
      const bGoalDifference = this.getMetricValue(
        b,
        FootballStandingMetric.GOAL_DIFFERENCE,
      );
      if (aGoalDifference !== bGoalDifference) {
        return bGoalDifference - aGoalDifference; // Higher goal difference first
      }
    }

    // If points are equal or it's not football, sort alphabetically by team name
    return a.team.name.localeCompare(b.team.name);
  }

  async delete(id: string): Promise<void> {
    await this.standingModel.findByIdAndDelete(id).exec();
  }
}
