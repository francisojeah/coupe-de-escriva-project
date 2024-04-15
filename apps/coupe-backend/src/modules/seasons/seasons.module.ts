import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Season, SeasonSchema } from './schemas/season.schema';
import { SeasonsController } from './seasons.controller';
import { SeasonsService } from './seasons.service';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UserService } from '../users/users.service';
import { PasswordRecover, PasswordRecoverSchema } from '../users/schemas/passwordRecover.schema';
import { UserEmailVerification, UserEmailVerificationSchema } from '../users/schemas/userEmailVerification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Season.name, schema: SeasonSchema },
      { name: User.name, schema: UserSchema },
      { name: PasswordRecover.name, schema: PasswordRecoverSchema },
      { name: UserEmailVerification.name, schema: UserEmailVerificationSchema },
    ]),
  ],
  controllers: [SeasonsController],
  providers: [SeasonsService, UserService],
  exports: [MongooseModule],
})
export class SeasonModule {}
