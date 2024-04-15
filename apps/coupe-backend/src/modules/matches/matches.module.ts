import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FixtureResultsController } from './matches.controller';
import { FixtureResultsService } from './matches.service';
import { FixturesResults, FixturesResultsSchema } from './schemas/match.schema';
import { PlayersService } from '../players/players.service';
import { StandingsService } from '../standings/standings.service';
import { Player, PlayerSchema } from '../players/schemas/player.schema';
import { Standing, StandingSchema } from '../standings/schemas/standing.schema';
import { TeamsService } from '../teams/teams.service';
import { Teams, TeamsSchema } from '../teams/schemas/team.schema';
import { SeasonsService } from '../seasons/seasons.service';
import { Season, SeasonSchema } from '../seasons/schemas/season.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UserService } from '../users/users.service';
import { PasswordRecover, PasswordRecoverSchema } from '../users/schemas/passwordRecover.schema';
import { UserEmailVerification, UserEmailVerificationSchema } from '../users/schemas/userEmailVerification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FixturesResults.name, schema: FixturesResultsSchema },
      { name: Player.name, schema: PlayerSchema },
      { name: Standing.name, schema: StandingSchema },
      { name: Teams.name, schema: TeamsSchema },
      { name: Season.name, schema: SeasonSchema },
      { name: User.name, schema: UserSchema },
      { name: PasswordRecover.name, schema: PasswordRecoverSchema },
      { name: UserEmailVerification.name, schema: UserEmailVerificationSchema },
    ]),
  ],
  controllers: [FixtureResultsController],
  providers: [
    FixtureResultsService,
    PlayersService,
    StandingsService,
    TeamsService,
    SeasonsService,
    UserService,
  ],
})
export class FixtureResultsModule {}
