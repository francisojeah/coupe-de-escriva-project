import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { SeasonsService } from './seasons.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { SeasonProps } from './interfaces/season.interfaces';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { ApiTags } from '@nestjs/swagger';
import { VerifyLogin } from '@/middleware/authorization/verifylogin.strategy';
import { Role } from '../users/interfaces/user.interfaces';
import { Roles } from '@/middleware/authorization/roles.decorator';

@ApiTags('seasons')
@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  // @UseGuards(VerifyLogin)
  @Roles(Role.Admin)
  @Post('create')
  async create(
    @Body() createSeasonDto: CreateSeasonDto,
    @Res() res: Response,
  ): Promise<Response<SeasonProps>> {
    try {
      const createdSeason = await this.seasonsService.create(createSeasonDto);
      return res.status(201).json(createdSeason);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('current-season')
  async findCurrentSeason(@Res() res: Response): Promise<any> {
    try {
      const season = await this.seasonsService.findCurrentSeason();
      return res.status(200).json(season);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response<SeasonProps[]>> {
    try {
      const seasons = await this.seasonsService.findAll();
      return res.status(200).json(seasons);
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
  ): Promise<Response<SeasonProps>> {
    try {
      const season = await this.seasonsService.findById(id);
      return res.status(200).json(season);
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
    @Body() updateSeasonDto: UpdateSeasonDto,
    @Res() res: Response,
  ): Promise<Response<SeasonProps>> {
    try {
      const updatedSeason = await this.seasonsService.update(
        id,
        updateSeasonDto,
      );
      return res.status(200).json(updatedSeason);
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
      await this.seasonsService.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
