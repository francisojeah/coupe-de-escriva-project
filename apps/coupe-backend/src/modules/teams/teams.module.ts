import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Teams, TeamsSchema } from './schemas/team.schema';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UserService } from '../users/users.service';
import { PasswordRecover, PasswordRecoverSchema } from '../users/schemas/passwordRecover.schema';
import { UserEmailVerification, UserEmailVerificationSchema } from '../users/schemas/userEmailVerification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Teams.name, schema: TeamsSchema },
      { name: User.name, schema: UserSchema },
      { name: PasswordRecover.name, schema: PasswordRecoverSchema },
      { name: UserEmailVerification.name, schema: UserEmailVerificationSchema },
    ]),
  ],
  controllers: [TeamsController],
  providers: [TeamsService, UserService],
  exports: [MongooseModule],
})
export class TeamModule {}
