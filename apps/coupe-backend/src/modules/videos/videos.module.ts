import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { Video, VideoSchema } from './schemas/video.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { PasswordRecover, PasswordRecoverSchema } from '../users/schemas/passwordRecover.schema';
import { UserEmailVerification, UserEmailVerificationSchema } from '../users/schemas/userEmailVerification.schema';
import { UserService } from '../users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Video.name, schema: VideoSchema },
      { name: User.name, schema: UserSchema },
      { name: PasswordRecover.name, schema: PasswordRecoverSchema },
      { name: UserEmailVerification.name, schema: UserEmailVerificationSchema },
    ]),
  ],
  controllers: [VideosController],
  providers: [VideosService, UserService],
})
export class VideosModule {}
