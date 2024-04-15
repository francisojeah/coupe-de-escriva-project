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
import { VideosService } from './videos.service';
import { VideoProps } from './interfaces/video.interfaces';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { VerifyLogin } from '@/middleware/authorization/verifylogin.strategy';
import { Role } from '../users/interfaces/user.interfaces';
import { Roles } from '@/middleware/authorization/roles.decorator';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<VideoProps>> {
    try {
      const Video = await this.videosService.findById(id);
      return res.status(200).json(Video);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('')
  async findAll(@Res() res: Response): Promise<Response<VideoProps[]>> {
    try {
      const video = await this.videosService.findAll();
      return res.status(200).json(video);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('videos-with-limit/:limit')
  async findVideosWithLimit(
    @Param('limit', ParseIntPipe) limit: number,
    @Res() res: Response,
  ): Promise<Response<VideoProps[]>> {
    try {
      const videos = await this.videosService.findVideosWithLimit(limit);
      return res.status(200).json(videos);
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
      await this.videosService.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
