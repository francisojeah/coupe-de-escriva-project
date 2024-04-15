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
  Patch,
  ValidationPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';

import { Response } from 'express';
import { StandingsService } from './standings.service';
import { StandingDto } from './dto/create-standing.dto';
import { ApiTags } from '@nestjs/swagger';
import { VerifyLogin } from '@/middleware/authorization/verifylogin.strategy';
import { Role } from '../users/interfaces/user.interfaces';
import { Roles } from '@/middleware/authorization/roles.decorator';

@ApiTags('standings')
@Controller('standings')
export class StandingsController {
  constructor(private readonly standingsService: StandingsService) {}

  // @UseGuards(VerifyLogin)
  @Roles(Role.Admin)
  @Post()
  async createStanding(@Body() standingDto: StandingDto, @Res() res: Response) {
    try {
      const createdStanding = await this.standingsService.create(standingDto);
      return res.status(HttpStatus.CREATED).json(createdStanding);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  // @UseGuards(VerifyLogin)
  @Roles(Role.Admin)
  @Post('create-all')
  async createAllStanding(@Res() res: Response) {
    try {
      const createdStanding = await this.standingsService.createStandings();
      return res.status(HttpStatus.CREATED).json(createdStanding);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get()
  async getAllStandings(@Res() res: Response) {
    try {
      const standings = await this.standingsService.findAll();
      return res.status(HttpStatus.OK).json(standings);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('/season/:seasonId')
  @UsePipes(new ValidationPipe({ transform: true })) // Transforming the parameter to ObjectId
  async getStandingsBySeason(
    @Param('seasonId') seasonId: string, // Using Types.ObjectId
    @Res() res: Response,
  ) {
    try {
      const standings = await this.standingsService.findBySeason(seasonId);
      return res.status(HttpStatus.OK).json(standings);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('/:seasonId/:division/:sport')
  @UsePipes(new ValidationPipe({ transform: true })) // Transforming the parameter to ObjectId
  async getStandingsBySeasonDivisionSport(
    @Param('seasonId') seasonId: string, // Using Types.ObjectId
    @Param('division') division: string,
    @Param('sport') sport: string,
    @Res() res: Response,
  ) {
    try {
      const standings = await this.standingsService.findBySeasonDivisionSport(
        seasonId,
        division,
        sport,
      );
      return res.status(HttpStatus.OK).json(standings);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  // @UseGuards(VerifyLogin)
  @Roles(Role.Admin)
  @Patch('/:id')
  async updateStanding(
    @Param('id') id: string,
    @Body() standingDto: StandingDto,
    @Res() res: Response,
  ) {
    try {
      const updatedStanding =
        await this.standingsService.updateStandingAndPosition(id, standingDto);
      return res.status(HttpStatus.OK).json(updatedStanding);
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
      await this.standingsService.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
