import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from './schemas/player.schema';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { Teams, TeamsSchema } from '../teams/schemas/team.schema';
import { TeamsService } from '../teams/teams.service';
import { SeasonsService } from '../seasons/seasons.service';
import { Season, SeasonSchema } from '../seasons/schemas/season.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UserService } from '../users/users.service';
import { PasswordRecover, PasswordRecoverSchema } from '../users/schemas/passwordRecover.schema';
import { UserEmailVerification, UserEmailVerificationSchema } from '../users/schemas/userEmailVerification.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Player.name, schema: PlayerSchema },
      { name: Teams.name, schema: TeamsSchema },
      { name: Season.name, schema: SeasonSchema },
      { name: User.name, schema: UserSchema },
      { name: PasswordRecover.name, schema: PasswordRecoverSchema },
      { name: UserEmailVerification.name, schema: UserEmailVerificationSchema },
    ]),
  ],
  controllers: [PlayersController],
  providers: [PlayersService, TeamsService, SeasonsService,
    UserService,
  ],
  exports: [MongooseModule],
})
export class PlayerModule {}
