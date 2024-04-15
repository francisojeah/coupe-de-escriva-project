import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Res,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayerDto } from './dto/create-player.dto';
import { PlayerProps } from './interfaces/player.interfaces';
import { Response } from 'express';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ApiTags } from '@nestjs/swagger';
import { VerifyLogin } from '@/middleware/authorization/verifylogin.strategy';
import { Roles } from '@/middleware/authorization/roles.decorator';
import { Role } from '../users/interfaces/user.interfaces';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  // @UseGuards(VerifyLogin)
  @Roles(Role.Admin)
  @Post()
  async create(
    @Body() createPlayerDto: PlayerDto,
    @Res() res: Response,
  ): Promise<Response<PlayerProps>> {
    try {
      // Create the player using the provided DTO
      const createdPlayer = await this.playersService.create(createPlayerDto);

      // Return the response with the created player
      return res.status(201).json(createdPlayer);
    } catch (error) {
      // Handle errors and return appropriate response
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<PlayerProps>> {
    try {
      const player = await this.playersService.findById(id);
      return res.status(200).json(player);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('')
  async findAll(@Res() res: Response): Promise<Response<PlayerProps[]>> {
    try {
      const players = await this.playersService.findAll();
      return res.status(200).json(players);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('/season/current-season-count')
  async getCurrentSeasonCount(@Res() res: Response) {
    try {
      const players = await this.playersService.getCurrentSeasonCount();
      return res.status(HttpStatus.OK).json(players);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('/:seasonId/:division/:sport')
  async getPlayersBySeasonDivisionSport(
    @Param('seasonId') seasonId: string,
    @Param('division') division: string,
    @Param('sport') sport: string,
    @Res() res: Response,
  ) {
    try {
      const players = await this.playersService.findBySeasonDivisionSport(
        seasonId,
        division,
        sport,
      );
      return res.status(HttpStatus.OK).json(players);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('/season/:seasonId')
  async getPlayersBySeason(
    @Param('seasonId') seasonId: string,
    @Res() res: Response,
  ) {
    try {
      const players = await this.playersService.findBySeason(seasonId);
      return res.status(HttpStatus.OK).json(players);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('/team/:teamId')
  async getPlayersByTeam(
    @Param('teamId') teamId: string,
    @Res() res: Response,
  ) {
    try {
      const players = await this.playersService.findByTeamId(teamId);
      return res.status(HttpStatus.OK).json(players);
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
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Res() res: Response,
  ): Promise<Response<PlayerProps>> {
    try {
      const updatedPlayer = await this.playersService.update(
        id,
        updatePlayerDto,
      );
      return res.status(200).json(updatedPlayer);
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
      await this.playersService.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
