import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post, PostSchema } from './schemas/post.schema';
import { Season, SeasonSchema } from '../seasons/schemas/season.schema';
import { SeasonsService } from '../seasons/seasons.service';
import { UserService } from '../users/users.service';
import { User, UserSchema } from '../users/schemas/user.schema';
import { PasswordRecover, PasswordRecoverSchema } from '../users/schemas/passwordRecover.schema';
import { UserEmailVerification, UserEmailVerificationSchema } from '../users/schemas/userEmailVerification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Season.name, schema: SeasonSchema },
      { name: User.name, schema: UserSchema },
      { name: PasswordRecover.name, schema: PasswordRecoverSchema },
      { name: UserEmailVerification.name, schema: UserEmailVerificationSchema },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService, SeasonsService, UserService],
})
export class PostsModule {}
