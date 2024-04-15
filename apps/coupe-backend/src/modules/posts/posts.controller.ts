import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Res,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostProps } from './interfaces/post.interfaces';
import { Response } from 'express';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@/middleware/authorization/roles.decorator';
import { Role } from '../users/interfaces/user.interfaces';
import { VerifyLogin } from '@/middleware/authorization/verifylogin.strategy';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // @UseGuards(VerifyLogin)
  @Roles(Role.Admin)
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @Res() res: Response,
  ): Promise<Response<PostProps>> {
    try {
      const createdPost = await this.postsService.create(createPostDto);
      return res.status(201).json(createdPost);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<PostProps>> {
    try {
      const post = await this.postsService.findById(id);
      return res.status(200).json(post);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('season/:seasonId')
  async findBySeason(
    @Param('seasonId') seasonId: string,
    @Res() res: Response,
  ): Promise<Response<PostProps[]>> {
    try {

      const posts = await this.postsService.findBySeason(seasonId);
      return res.status(200).json(posts);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('season/:seasonId/posts-with-limit/:limit')
  async findBySeasonWithLimit(
    @Param('seasonId') seasonId: string,
    @Param('limit', ParseIntPipe) limit: number,
    @Res() res: Response,
  ): Promise<Response<PostProps[]>> {
    try {
      const posts = await this.postsService.findBySeasonWithLimit(seasonId, limit);
      return res.status(200).json(posts);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('')
  async findAll(@Res() res: Response): Promise<Response<PostProps[]>> {
    try {
      const post = await this.postsService.findAll();
      return res.status(200).json(post);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  // @UseGuards(VerifyLogin)
  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Res() res: Response,
  ): Promise<Response<PostProps>> {
    try {
      const updatedPost = await this.postsService.update(id, updatePostDto);
      return res.status(200).json(updatedPost);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  // @UseGuards(VerifyLogin)
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<void>> {
    try {
      await this.postsService.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
