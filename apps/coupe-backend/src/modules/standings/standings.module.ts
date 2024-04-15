import { Module } from '@nestjs/common';
import { StandingsService } from './standings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StandingsController } from './standings.controller';
import { Standing, StandingSchema } from './schemas/standing.schema';
import { Teams, TeamsSchema } from '../teams/schemas/team.schema';
import { SeasonsService } from '../seasons/seasons.service';
import { Season, SeasonSchema } from '../seasons/schemas/season.schema';
import { UserService } from '../users/users.service';
import { User, UserSchema } from '../users/schemas/user.schema';
import { PasswordRecover, PasswordRecoverSchema } from '../users/schemas/passwordRecover.schema';
import { UserEmailVerification, UserEmailVerificationSchema } from '../users/schemas/userEmailVerification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Standing.name, schema: StandingSchema },
      { name: Teams.name, schema: TeamsSchema },
      { name: Season.name, schema: SeasonSchema },
      { name: User.name, schema: UserSchema },
      { name: PasswordRecover.name, schema: PasswordRecoverSchema },
      { name: UserEmailVerification.name, schema: UserEmailVerificationSchema },
    ]),
  ],
  controllers: [StandingsController],
  providers: [StandingsService, SeasonsService, UserService],
  exports: [MongooseModule],
})
export class StandingsModule {}
