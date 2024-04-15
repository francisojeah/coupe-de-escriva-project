import { HttpException, HttpStatus, Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FixtureResultProps, TeamLineup } from './interfaces/match.interfaces';
import {
  FixtureResultDto,
  SubstitutionDto,
  TeamLineupDto,
  UpdateStatsDto,
} from './dto/create-match.dto';
import { UpdateFixtureResultDto } from './dto/update-match.dto';
import { FixturesResults } from './schemas/match.schema';
import {
  BasketballStandingMetric,
  FootballStandingMetric,
  StandingsProps,
  VolleyballStandingMetric,
} from '../standings/interfaces/standing.interfaces';
import { StandingsService } from '../standings/standings.service';
import { PlayerProps } from '../players/interfaces/player.interfaces';
import { PlayersService } from '../players/players.service';
import { Sports } from '../teams/interfaces/team.interfaces';

@Injectable()
export class FixtureResultsService {
  constructor(
    @InjectModel(FixturesResults.name)
    private readonly fixtureResultModel: Model<FixturesResults>,
    private readonly standingsService: StandingsService,
    private readonly playerService: PlayersService,
  ) {}

  async create(
    createFixtureResultDto: FixtureResultDto,
  ): Promise<FixtureResultProps> {
    // Convert season ID to ObjectId
    const seasonObjectId = Types.ObjectId.isValid(createFixtureResultDto.season)
      ? new Types.ObjectId(createFixtureResultDto.season)
      : null;

    if (!seasonObjectId) {
      throw new HttpException(
        'Invalid season ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Convert home team ID to ObjectId
    const homeTeamObjectId = Types.ObjectId.isValid(
      createFixtureResultDto.fixtures?.home_team_id,
    )
      ? new Types.ObjectId(createFixtureResultDto.fixtures?.home_team_id)
      : null;

    if (!homeTeamObjectId) {
      throw new HttpException(
        'Invalid home team ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Convert away team ID to ObjectId
    const awayTeamObjectId = Types.ObjectId.isValid(
      createFixtureResultDto.fixtures?.away_team_id,
    )
      ? new Types.ObjectId(createFixtureResultDto.fixtures?.away_team_id)
      : null;

    if (!awayTeamObjectId) {
      throw new HttpException(
        'Invalid away team ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Create a new fixture result with converted object IDs
    const createdFixtureResult = new this.fixtureResultModel({
      ...createFixtureResultDto,
      season: seasonObjectId,
      fixtures: {
        ...createFixtureResultDto.fixtures,
        home_team_id: homeTeamObjectId,
        away_team_id: awayTeamObjectId,
      },
    });

    return createdFixtureResult.save();
  }

  async findById(id: string): Promise<FixtureResultProps> {
    try {
      const fixtureResult = await this.fixtureResultModel
        .aggregate([
          {
            $match: { _id: new Types.ObjectId(id) },
          },
          {
            $lookup: {
              from: 'teams',
              localField: 'fixtures.home_team_id',
              foreignField: '_id',
              as: 'fixtures.home_team_id',
            },
          },
          {
            $unwind: '$fixtures.home_team_id',
          },
          {
            $lookup: {
              from: 'teams',
              localField: 'fixtures.away_team_id',
              foreignField: '_id',
              as: 'fixtures.away_team_id',
            },
          },
          {
            $unwind: '$fixtures.away_team_id',
          },
        ])
        .exec();

      if (!fixtureResult || fixtureResult.length === 0) {
        throw new HttpException(
          'Fixture result not found',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      // Assuming that fixtureResult is an array with only one element
      return fixtureResult[0];
    } catch (error) {
      console.error('Error finding fixture result by ID:', error);
      throw error;
    }
  }

  async findAll(): Promise<FixtureResultProps[]> {
    return this.fixtureResultModel.find().exec();
  }

  async findBySeasonDivisionSport(
    seasonId: string,
    division: string,
    sport: string,
  ): Promise<any> {
    try {
      const seasonObjectId = /^[0-9a-fA-F]{24}$/.test(seasonId)
        ? new Types.ObjectId(seasonId)
        : undefined;

      if (!seasonObjectId) {
        return;
      }

      // Use aggregation to filter standings by season, division, and sport
      return await this.fixtureResultModel.aggregate([
        {
          $match: { season: seasonObjectId },
        },
        {
          $lookup: {
            from: 'teams',
            localField: 'fixtures.home_team_id',
            foreignField: '_id',
            as: 'fixtures.home_team_id',
          },
        },
        {
          $unwind: '$fixtures.home_team_id',
        },
        {
          $lookup: {
            from: 'teams',
            localField: 'fixtures.away_team_id',
            foreignField: '_id',
            as: 'fixtures.away_team_id',
          },
        },
        {
          $unwind: '$fixtures.away_team_id',
        },
        {
          $match: {
            'fixtures.home_team_id.division': division,
            'fixtures.home_team_id.sport': sport,
            'fixtures.away_team_id.division': division,
            'fixtures.away_team_id.sport': sport,
          },
        },
        {
          $sort: { 'fixtures.date': -1 },
        },
      ]);
    } catch (error) {
      console.error(
        'Error finding fixtures by season, division, and sport:',
        error,
      );
      throw error;
    }
  }

  async updateFixtureResult(id: string): Promise<FixtureResultProps> {
    // Fixing return type
    const existingFixtureResult = await this.fixtureResultModel.findById(id);

    if (!existingFixtureResult) {
      throw new HttpException(
        'Fixture result not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!existingFixtureResult.fixtures.result) {
      await this.incrementPlayedInStandings(existingFixtureResult);

      return await this.update(id, {
        fixtures: {
          result: {
            home_team_score: 0,
            away_team_score: 0,
          },
          ...existingFixtureResult.fixtures,
        },
      });
    }
  }

  private async incrementPlayedInStandings(
    existingFixtureResult: FixtureResultProps,
  ): Promise<void> {
    const { home_team_id, away_team_id } = existingFixtureResult.fixtures;

    // Find standings for the home and away teams
    const [homeTeamStandings, awayTeamStandings] = await Promise.all([
      this.standingsService.findById(home_team_id),
      this.standingsService.findById(away_team_id),
    ]);

    // Define a function to update the PLAYED metric for a given set of standings
    const updatePlayedMetric = async (standings: StandingsProps) => {
      const played =
        this.getMetricValue(standings, FootballStandingMetric.PLAYED) + 1;
      this.setMetricValue(standings, FootballStandingMetric.PLAYED, played);

      if (standings.team.sport === Sports.Football) {
        this.incrementMetric(standings, FootballStandingMetric.DRAWS);
        this.incrementMetric(standings, FootballStandingMetric.POINTS);
      }

      await this.standingsService.updateStandingAndPosition(
        standings._id.toString(),
        standings,
      );
    };

    // Update PLAYED metric for both home and away team standings
    await Promise.all([
      updatePlayedMetric(homeTeamStandings),
      updatePlayedMetric(awayTeamStandings),
    ]);
  }

  private async updateStandings(
    existingFixtureResult: FixtureResultProps,
    updatedFixtureResult: UpdateFixtureResultDto,
    value: number,
  ): Promise<void> {
    const homeTeamStandings = await this.standingsService.findById(
      existingFixtureResult.fixtures.home_team_id,
    );
    const awayTeamStandings = await this.standingsService.findById(
      existingFixtureResult.fixtures.away_team_id,
    );

    const standings = [homeTeamStandings, awayTeamStandings];

    const { home_team_score, away_team_score } =
      updatedFixtureResult.fixtures.result;

    standings.forEach(async (standing: StandingsProps) => {
      let homeTeamWon = false;
      let awayTeamWon = false;
      let isDraw = false;

      switch (existingFixtureResult.sport) {
        case Sports.Football:
          homeTeamWon = home_team_score > away_team_score;
          awayTeamWon = away_team_score > home_team_score;
          isDraw = home_team_score === away_team_score;
          await this.updateFootballStandings(
            standing,
            existingFixtureResult,
            homeTeamWon,
            awayTeamWon,
            isDraw,
            value,
          );
          break;
        case Sports.Basketball:
          homeTeamWon = home_team_score > away_team_score;
          awayTeamWon = away_team_score > home_team_score;
          await this.updateBasketballStandings(
            standing,
            existingFixtureResult,
            homeTeamWon,
            awayTeamWon,
            value,
          );
          break;
        case Sports.Volleyball:
          homeTeamWon = home_team_score > away_team_score;
          awayTeamWon = away_team_score > home_team_score;
          // Update volleyball standings logic here
          break;
        default:
          break;
      }

      // Update standings and positions
      await this.standingsService.updateStandingAndPosition(
        standing._id.toString(),
        standing,
      );
    });
  }

  async updateStats(
    id: string,
    updateStatsDto: UpdateStatsDto,
  ): Promise<FixtureResultProps> {
    const existingFixtureResult = await this.fixtureResultModel.findById(id);

    if (!existingFixtureResult || !existingFixtureResult.fixtures.lineup) {
      throw new HttpException(
        'Fixture result or lineup not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const { player_id, team, stat } = updateStatsDto;

    const isHomeTeam =
      existingFixtureResult.fixtures.lineup.home?.team_id === team;
    const isAwayTeam =
      existingFixtureResult.fixtures.lineup.away?.team_id === team;
    if (!isHomeTeam && !isAwayTeam) {
      throw new HttpException(
        'Team lineup not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const statType = Object.keys(stat)[0]; // Get the type of stat
    const isGoalOrPoint = ['goals', 'points'].includes(statType); // Check if it's a goal or point
    const updatedFixtureResult = existingFixtureResult;

    if (isGoalOrPoint) {
      const statValue = stat[statType];
      const currentScore = updatedFixtureResult.fixtures.result[
        isHomeTeam ? 'home_team_score' : 'away_team_score'
      ];
      updatedFixtureResult.fixtures.result[
        isHomeTeam ? 'home_team_score' : 'away_team_score'
      ] = currentScore + statValue;
    
      await this.updateStandings(
        existingFixtureResult,
        updatedFixtureResult,
        statValue,
      );
    }

    const teamLineupKey = isHomeTeam ? 'home' : 'away';
    const teamLineup = updatedFixtureResult.fixtures.lineup[teamLineupKey];

    const playerToUpdateIndex = teamLineup.players.findIndex(
      (player) => player.player_id === player_id,
    );

    if (playerToUpdateIndex === -1) {
      throw new HttpException(
        'Player not found in the lineup',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    Object.entries(stat).forEach(([statName, statValue]) => {
      teamLineup.players[playerToUpdateIndex].stats =
        teamLineup.players[playerToUpdateIndex].stats || {};
      teamLineup.players[playerToUpdateIndex].stats[statName] =
        (teamLineup.players[playerToUpdateIndex].stats[statName] || 0) +
        statValue;
    });

    await this.playerService.updatePlayerStats(
      player_id.toString(),
      existingFixtureResult.sport as Sports,
      stat,
    );

    return await this.update(id, {
      fixtures: {
        ...updatedFixtureResult.fixtures,
        lineup: {
          ...updatedFixtureResult.fixtures.lineup,
          [teamLineupKey]: teamLineup,
        },
      },
      ...existingFixtureResult,
    });
  }

  private async updateFootballStandings(
    standing: StandingsProps,
    existingFixtureResult: FixtureResultProps,
    homeTeamWon: boolean,
    awayTeamWon: boolean,
    isDraw: boolean,
    value: number,
  ): Promise<any> {
    const fixtureResult = await this.fixtureResultModel.findById(
      existingFixtureResult._id,
    );

    if (!fixtureResult) {
      throw new HttpException(
        'Fixture result not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      ); // Throwing error instead of returning undefined
    }

    const {
      home_team_score: homeTeamScoreBeforeUpdate,
      away_team_score: awayTeamScoreBeforeUpdate,
    } = fixtureResult.fixtures.result;

    const { home_team_score, away_team_score } =
      existingFixtureResult.fixtures.result;

    const wasDrawBeforeUpdate =
      homeTeamScoreBeforeUpdate === awayTeamScoreBeforeUpdate;
    const wasHomeWinBeforeUpdate =
      homeTeamScoreBeforeUpdate > awayTeamScoreBeforeUpdate;
    const wasAwayWinBeforeUpdate =
      awayTeamScoreBeforeUpdate > homeTeamScoreBeforeUpdate;

    // Determine whether the standing corresponds to the home team or the away team
    const isHomeTeamStanding = standing.team.equals(
      existingFixtureResult.fixtures.home_team_id,
    );

    const isAwayTeamStanding = standing.team.equals(
      existingFixtureResult.fixtures.away_team_id,
    );

    if (home_team_score > homeTeamScoreBeforeUpdate) {
      // If the home team scored a goal
      if (isHomeTeamStanding) {
        this.incrementMetric(standing, FootballStandingMetric.GOALS_FOR, value);
      } else {
        this.incrementMetric(
          standing,
          FootballStandingMetric.GOALS_AGAINST,
          value,
        );
      }
    } else if (away_team_score > awayTeamScoreBeforeUpdate) {
      // If the away team scored a goal
      if (isAwayTeamStanding) {
        this.incrementMetric(standing, FootballStandingMetric.GOALS_FOR, value);
      } else {
        this.incrementMetric(
          standing,
          FootballStandingMetric.GOALS_AGAINST,
          value,
        );
      }
    }

    // If the match was a draw before the update
    if (wasDrawBeforeUpdate) {
      if (isHomeTeamStanding) {
        if (homeTeamWon) {
          this.decrementMetric(standing, FootballStandingMetric.DRAWS);
          this.incrementMetric(standing, FootballStandingMetric.WINS);
        } else if (!isDraw) {
          // Corrected condition
          this.decrementMetric(standing, FootballStandingMetric.DRAWS);
          this.incrementMetric(standing, FootballStandingMetric.LOSSES);
        }
      } else if (isAwayTeamStanding) {
        if (awayTeamWon) {
          this.decrementMetric(standing, FootballStandingMetric.DRAWS);
          this.incrementMetric(standing, FootballStandingMetric.WINS);
        } else if (!isDraw) {
          // Corrected condition
          this.decrementMetric(standing, FootballStandingMetric.DRAWS);
          this.incrementMetric(standing, FootballStandingMetric.LOSSES);
        }
      }
    }

    // If the home team won before the update and the match became a draw after the update
    if (wasHomeWinBeforeUpdate && isDraw && isHomeTeamStanding) {
      // Decrement win and increment draw for the home team
      this.decrementMetric(standing, FootballStandingMetric.WINS);
      this.incrementMetric(standing, FootballStandingMetric.DRAWS);
    } else if (wasHomeWinBeforeUpdate && isDraw && isAwayTeamStanding) {
      // Decrement win and increment loss for the home team
      this.decrementMetric(standing, FootballStandingMetric.LOSSES);
      this.incrementMetric(standing, FootballStandingMetric.DRAWS);
    }

    // If the away team won before the update and the match became a draw after the update
    if (wasAwayWinBeforeUpdate && isDraw && isAwayTeamStanding) {
      // Decrement win and increment draw for the away team
      this.decrementMetric(standing, FootballStandingMetric.WINS);
      this.incrementMetric(standing, FootballStandingMetric.DRAWS);
    } else if (wasAwayWinBeforeUpdate && isDraw && isHomeTeamStanding) {
      // Decrement win and increment loss for the away team
      this.decrementMetric(standing, FootballStandingMetric.LOSSES);
      this.incrementMetric(standing, FootballStandingMetric.DRAWS);
    }

    // Calculate points
    const wins = this.getMetricValue(standing, FootballStandingMetric.WINS);
    const draws = this.getMetricValue(standing, FootballStandingMetric.DRAWS);
    const points = wins * 3 + draws; // Calculate points correctly

    // Set points metric
    this.setMetricValue(standing, FootballStandingMetric.POINTS, points);
  }

  private async updateBasketballStandings(
    standing: StandingsProps,
    existingFixtureResult: FixtureResultProps,
    homeTeamWon: boolean,
    awayTeamWon: boolean,
    value: number,
  ): Promise<any> {
    // Determine whether the standing corresponds to the home team or the away team
    const isHomeTeamStanding = standing.team.equals(
      existingFixtureResult.fixtures.home_team_id,
    );

    const isAwayTeamStanding = standing.team.equals(
      existingFixtureResult.fixtures.away_team_id,
    );

    // Increment wins for the winning team, losses for the losing team
    if (
      (homeTeamWon && isHomeTeamStanding) ||
      (awayTeamWon && isAwayTeamStanding)
    ) {
      this.incrementMetric(standing, BasketballStandingMetric.WINS);
    } else {
      this.incrementMetric(standing, BasketballStandingMetric.LOSSES);
    }

    // Decrement wins for the losing team, losses for the winning team
    if (
      (homeTeamWon && isAwayTeamStanding) ||
      (awayTeamWon && isHomeTeamStanding)
    ) {
      this.decrementMetric(standing, BasketballStandingMetric.WINS);
    } else {
      this.decrementMetric(standing, BasketballStandingMetric.LOSSES);
    }

    if (homeTeamWon) {
      // If the home team scored a goal
      if (isHomeTeamStanding) {
        this.incrementMetric(
          standing,
          BasketballStandingMetric.POINTS_FOR,
          value,
        );
      } else {
        this.incrementMetric(
          standing,
          BasketballStandingMetric.POINTS_AGAINST,
          value,
        );
      }
    } else if (awayTeamWon) {
      // If the away team scored a goal
      if (isAwayTeamStanding) {
        this.incrementMetric(
          standing,
          BasketballStandingMetric.POINTS_FOR,
          value,
        );
      } else {
        this.incrementMetric(
          standing,
          BasketballStandingMetric.POINTS_AGAINST,
          value,
        );
      }
    }

    // Calculate point difference
    const pointsFor = this.getMetricValue(
      standing,
      BasketballStandingMetric.POINTS_FOR,
    );
    const pointsAgainst = this.getMetricValue(
      standing,
      BasketballStandingMetric.POINTS_AGAINST,
    );
    const pointDifference = pointsFor - pointsAgainst;
    this.setMetricValue(
      standing,
      BasketballStandingMetric.POINT_DIFFERENCE,
      pointDifference,
    );

    // Calculate total points (2 points for a win)
    const wins = this.getMetricValue(standing, BasketballStandingMetric.WINS);
    const points = wins * 2;
    this.setMetricValue(standing, BasketballStandingMetric.POINTS, points);

    // Calculate winning percentage
    const played =
      wins + this.getMetricValue(standing, BasketballStandingMetric.LOSSES);
    const winningPercentage = wins / played;
    this.setMetricValue(
      standing,
      BasketballStandingMetric.WINNING_PERCENTAGE,
      winningPercentage,
    );
  }

  private decrementMetric(
    standing: StandingsProps,
    metric:
      | FootballStandingMetric
      | BasketballStandingMetric
      | VolleyballStandingMetric,
    value?: number,
  ): void {
    const metricIndex = standing.metrics.findIndex((m) => m.metric === metric);
    if (metricIndex !== -1) {
      standing.metrics[metricIndex].value -= value || 1;
    }
  }

  private incrementMetric(
    standing: StandingsProps,
    metric:
      | FootballStandingMetric
      | BasketballStandingMetric
      | VolleyballStandingMetric,
    value?: number,
  ): void {
    const metricIndex = standing.metrics.findIndex((m) => m.metric === metric);
    if (metricIndex !== -1) {
      standing.metrics[metricIndex].value += value || 1;
    }
  }

  private getMetricValue(
    standing: StandingsProps,
    metric:
      | FootballStandingMetric
      | BasketballStandingMetric
      | VolleyballStandingMetric,
  ): number {
    const metricData = standing.metrics.find((m) => m.metric === metric);
    return metricData ? metricData.value : 0;
  }

  private setMetricValue(
    standing: StandingsProps,
    metric:
      | FootballStandingMetric
      | BasketballStandingMetric
      | VolleyballStandingMetric,
    value: number,
  ): void {
    const metricIndex = standing.metrics.findIndex((m) => m.metric === metric);
    if (metricIndex !== -1) {
      standing.metrics[metricIndex].value = value;
    } else {
      standing.metrics.push({ metric, value });
    }
  }

  async addLineup(
    fixtureId: string,
    lineupDto: TeamLineupDto,
  ): Promise<FixturesResults> {
    const existingFixtureResult =
      await this.fixtureResultModel.findById(fixtureId);
    if (!existingFixtureResult) {
      throw new HttpException('Fixture result not found', HttpStatus.NOT_FOUND);
    }

    const teamObjectId = Types.ObjectId.isValid(lineupDto.team_id)
      ? new Types.ObjectId(lineupDto.team_id)
      : null;

    if (!teamObjectId) {
      throw new HttpException('Invalid team ID', HttpStatus.BAD_REQUEST);
    }

    const homeTeamObjectId = existingFixtureResult.fixtures.home_team_id;
    const awayTeamObjectId = existingFixtureResult.fixtures.away_team_id;

    // Determine if the team is the home or away team
    const isHomeTeam = teamObjectId.equals(homeTeamObjectId);

    // Update the lineup based on the team
    let updatedLineup = existingFixtureResult.fixtures.lineup || {};

    if (isHomeTeam) {
      updatedLineup.home = lineupDto;
    } else {
      updatedLineup.away = lineupDto;
    }

    // Construct the update payload
    const updatePayload = {
      fixtures: {
        lineup: updatedLineup,
        ...existingFixtureResult.fixtures,
      },
    };

    const updatedFixtureResult = await this.update(fixtureId, updatePayload);

    if (!updatedFixtureResult) {
      throw new HttpException(
        'Failed to update fixture result',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return updatedFixtureResult;
  }

  async update(
    id: string,
    updateFixtureResultDto: UpdateFixtureResultDto,
  ): Promise<FixtureResultProps> {
    return this.fixtureResultModel
      .findByIdAndUpdate(id, updateFixtureResultDto, { new: true })
      .exec();
  }

  async makeSubstitution(
    id: string,
    substitutionDto: SubstitutionDto,
  ): Promise<FixtureResultProps> {
    const existingFixtureResult = await this.fixtureResultModel.findById(id);

    if (!existingFixtureResult) {
      throw new HttpException(
        'Fixture result not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const teamObjectId = Types.ObjectId.isValid(substitutionDto.team)
      ? new Types.ObjectId(substitutionDto.team)
      : null;

    if (!teamObjectId) {
      throw new HttpException(
        'Invalid team ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Find the team that needs substitution
    let teamToSubstitute;
    if (teamObjectId.equals(existingFixtureResult.fixtures.home_team_id)) {
      teamToSubstitute = existingFixtureResult.fixtures.lineup?.home;
    } else if (
      teamObjectId.equals(existingFixtureResult.fixtures.away_team_id)
    ) {
      teamToSubstitute = existingFixtureResult.fixtures.lineup?.away;
    } else {
      throw new HttpException(
        'Invalid team provided for substitution',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!teamToSubstitute) {
      throw new HttpException(
        'Team lineup not found for substitution',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Find the players to be substituted and substitute them
    const { playerOutId, playerInId } = substitutionDto;
    const substitutedPlayers = teamToSubstitute.players.map((player) => {
      if (
        player.player_id.equals(playerOutId) ||
        player.player_id.equals(playerInId)
      ) {
        player.isSubstitute = !player.isSubstitute;
      }
      return player;
    });

    teamToSubstitute.players = substitutedPlayers;

    return await existingFixtureResult.save();
  }

  async delete(id: string): Promise<void> {
    await this.fixtureResultModel.findByIdAndDelete(id).exec();
  }
}
